// Design: "Field to File" — deep forest green (#2d5016), Outfit font, clean forms
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Mode = 'login' | 'signup' | 'reset';

export default function Auth() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage({ text: error.message, type: 'error' });
      // On success, AuthContext updates and App.tsx redirects automatically

    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Check your email to confirm your account, then log in.', type: 'success' });
        setMode('login');
      }

    } else if (mode === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/portal`,
      });
      if (error) {
        setMessage({ text: error.message, type: 'error' });
      } else {
        setMessage({ text: 'Password reset email sent — check your inbox.', type: 'success' });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-['Outfit'] text-2xl font-bold text-[#2d5016]">Taylor Made</span>
            <span className="font-['Outfit'] text-2xl font-light text-[#4a7c2f] ml-2">ESTIMATES</span>
          </a>
          <p className="text-sm text-gray-500 mt-1">Client Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="font-['Outfit'] text-2xl font-semibold text-[#2d5016] mb-6">
            {mode === 'login' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'reset' && 'Reset Password'}
          </h1>

          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]/30 focus:border-[#2d5016] text-sm"
                  placeholder="Jane Smith"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]/30 focus:border-[#2d5016] text-sm"
                placeholder="you@example.com"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]/30 focus:border-[#2d5016] text-sm"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2d5016] hover:bg-[#3d6b1f] text-white font-['Outfit'] font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? 'Please wait…' : (
                mode === 'login' ? 'Sign In' :
                mode === 'signup' ? 'Create Account' :
                'Send Reset Email'
              )}
            </button>
          </form>

          {/* Mode switchers */}
          <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
            {mode === 'login' && (
              <>
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => { setMode('signup'); setMessage(null); }} className="text-[#2d5016] font-medium hover:underline">
                    Sign up
                  </button>
                </p>
                <p>
                  <button onClick={() => { setMode('reset'); setMessage(null); }} className="text-[#2d5016] hover:underline">
                    Forgot password?
                  </button>
                </p>
              </>
            )}
            {(mode === 'signup' || mode === 'reset') && (
              <p>
                <button onClick={() => { setMode('login'); setMessage(null); }} className="text-[#2d5016] font-medium hover:underline">
                  ← Back to sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
