// Design: "Field to File" — deep forest green (#2d5016), Outfit font, clean dashboard
import { useState, useEffect, useRef } from 'react';
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

export default function Portal() {
  const { user, signOut } = useAuth();
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) fetchUploads();
  }, [user]);

  const fetchUploads = async () => {
    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .order('uploaded_at', { ascending: false });
    if (!error && data) setUploads(data as UploadRecord[]);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !user) return;
    setUploading(true);
    setMessage(null);

    for (const file of Array.from(files)) {
      const filePath = `${user.id}/${Date.now()}_${file.name}`;

      const { error: storageError } = await supabase.storage
        .from('customer-files')
        .upload(filePath, file);

      if (storageError) {
        setMessage({ text: `Failed to upload ${file.name}: ${storageError.message}`, type: 'error' });
        continue;
      }

      const { error: dbError } = await supabase.from('uploads').insert({
        user_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
      });

      if (dbError) {
        setMessage({ text: `File uploaded but metadata failed: ${dbError.message}`, type: 'error' });
      }
    }

    setMessage({ text: `${files.length === 1 ? 'File' : `${files.length} files`} uploaded successfully.`, type: 'success' });
    setUploading(false);
    fetchUploads();
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <a href="/" className="font-['Outfit'] text-xl font-bold text-[#2d5016]">
            Taylor Made <span className="font-light">ESTIMATES</span>
          </a>
          <span className="ml-3 text-sm text-gray-400">Client Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
          <button
            onClick={signOut}
            className="text-sm text-[#2d5016] hover:underline font-medium"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="font-['Outfit'] text-2xl font-semibold text-[#2d5016] mb-2">Upload Files</h1>
        <p className="text-gray-500 text-sm mb-8">
          Upload photos, PDFs, reports, or any documents related to your claim. We'll receive them instantly.
        </p>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors mb-6 ${
            dragOver
              ? 'border-[#2d5016] bg-[#2d5016]/5'
              : 'border-gray-200 hover:border-[#4a7c2f] hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          <div className="text-4xl mb-3">📎</div>
          <p className="font-['Outfit'] font-medium text-gray-700">
            {uploading ? 'Uploading…' : 'Drop files here or click to browse'}
          </p>
          <p className="text-sm text-gray-400 mt-1">Photos, PDFs, reports, sketches — any file type accepted</p>
        </div>

        {message && (
          <div className={`mb-6 p-3 rounded-lg text-sm ${
            message.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Upload history */}
        <h2 className="font-['Outfit'] text-lg font-semibold text-[#2d5016] mb-4">Your Uploads</h2>
        {uploads.length === 0 ? (
          <p className="text-gray-400 text-sm">No files uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {uploads.map(u => (
              <div key={u.id} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{u.file_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(u.uploaded_at)} · {formatBytes(u.file_size)}</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full ml-4 shrink-0">Received</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
