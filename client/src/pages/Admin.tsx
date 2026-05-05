// Design: "Field to File" — deep forest green (#2d5016), Outfit font, admin dashboard
import { useState, useEffect } from 'react';
import { supabase, UploadRecord } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

function formatBytes(bytes: number | null) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

type UploadWithEmail = UploadRecord & { email?: string };

export default function Admin() {
  const { user, signOut } = useAuth();
  const [uploads, setUploads] = useState<UploadWithEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUploads();
  }, []);

  const fetchAllUploads = async () => {
    setLoading(true);

    // Use service-level access — admin sees all via RLS policy "Admin can view all files"
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setUploads(data as UploadWithEmail[]);
    }
    setLoading(false);
  };

  const downloadFile = async (upload: UploadRecord) => {
    setDownloading(upload.id);
    const { data, error } = await supabase.storage
      .from('customer-files')
      .download(upload.file_path);

    if (error) {
      alert(`Download failed: ${error.message}`);
    } else {
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = upload.file_name;
      a.click();
      URL.revokeObjectURL(url);
    }
    setDownloading(null);
  };

  // Group uploads by user_id
  const grouped = uploads.reduce<Record<string, UploadWithEmail[]>>((acc, u) => {
    if (!acc[u.user_id]) acc[u.user_id] = [];
    acc[u.user_id].push(u);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <a href="/" className="font-['Outfit'] text-xl font-bold text-[#2d5016]">
            Taylor Made <span className="font-light">ESTIMATES</span>
          </a>
          <span className="ml-3 text-sm text-gray-400">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
          <button onClick={signOut} className="text-sm text-[#2d5016] hover:underline font-medium">
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Outfit'] text-2xl font-semibold text-[#2d5016]">Customer Files</h1>
            <p className="text-gray-500 text-sm mt-1">{uploads.length} total uploads from {Object.keys(grouped).length} customers</p>
          </div>
          <button
            onClick={fetchAllUploads}
            className="text-sm text-[#2d5016] border border-[#2d5016]/30 px-4 py-2 rounded-lg hover:bg-[#2d5016]/5 transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading…</p>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-gray-400 text-sm">No uploads yet.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([userId, userUploads]) => (
              <div key={userId} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-[#2d5016]/5 border-b border-gray-100">
                  <p className="font-['Outfit'] font-semibold text-[#2d5016] text-sm">
                    Customer ID: <span className="font-mono text-xs">{userId.slice(0, 8)}…</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{userUploads.length} file{userUploads.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {userUploads.map(u => (
                    <div key={u.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{u.file_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(u.uploaded_at)} · {formatBytes(u.file_size)}</p>
                      </div>
                      <button
                        onClick={() => downloadFile(u)}
                        disabled={downloading === u.id}
                        className="ml-4 shrink-0 text-sm bg-[#2d5016] text-white px-4 py-1.5 rounded-lg hover:bg-[#3d6b1f] transition-colors disabled:opacity-60"
                      >
                        {downloading === u.id ? 'Downloading…' : 'Download'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
