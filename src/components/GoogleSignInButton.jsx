import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, Sparkles, Database, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function GoogleSignInButton({ role = 'Customer', onSuccess, text = 'Continue with Google' }) {
  const { loginWithSupabaseGoogle, isSupabaseReady, supabaseConfig, updateSupabaseKeys } = useAuth();
  
  const [showConfig, setShowConfig] = useState(false);
  const [urlInput, setUrlInput] = useState(supabaseConfig.url || '');
  const [anonKeyInput, setAnonKeyInput] = useState(supabaseConfig.anonKey || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleClick = async () => {
    setIsLoading(true);
    try {
      const res = await loginWithSupabaseGoogle(role);
      if (res?.user && onSuccess) {
        onSuccess(res.user);
      }
    } catch (err) {
      console.warn('Google Supabase login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateSupabaseKeys(urlInput.trim(), anonKeyInput.trim());
    setShowConfig(false);
  };

  return (
    <div className="w-full space-y-2">
      {/* Primary Google Auth Button via Supabase */}
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#FAF9F6] text-[#262626] border border-[#E6E2D6] hover:border-[#DCC573] font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer relative overflow-hidden"
      >
        {/* Authentic Multi-Color Google G Icon */}
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>

        <span>{isLoading ? 'Connecting with Google...' : text}</span>

        {isSupabaseReady ? (
          <span className="text-[10px] bg-[#EFF6EE] text-[#3F693A] border border-[#CDE1CC] px-2 py-0.5 rounded-full font-bold ml-auto hidden sm:inline-block">
            Supabase OAuth
          </span>
        ) : (
          <span className="text-[10px] bg-[#FAF6E8] text-[#8A7326] border border-[#EFE3B5] px-2 py-0.5 rounded-full font-bold ml-auto hidden sm:inline-block">
            One-Click Auth
          </span>
        )}
      </button>

      {/* Supabase Connection Details & Settings Bar */}
      <div className="flex items-center justify-between text-[11px] text-[#666666] px-1">
        <span className="flex items-center gap-1">
          <Database className="w-3.5 h-3.5 text-[#5C8F57]" />
          <span>Supabase Auth Backend</span>
        </span>
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="text-[#8A7326] hover:text-[#000000] font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Settings className="w-3 h-3" />
          <span>{isSupabaseReady ? 'Supabase Connected' : 'Configure Supabase Keys'}</span>
        </button>
      </div>

      {/* Pop-out Supabase Credentials Configuration Form */}
      {showConfig && (
        <form onSubmit={handleSaveConfig} className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E6E2D6] shadow-sm space-y-3 text-xs animate-in fade-in duration-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-[#000000]">
              <ShieldCheck className="w-4 h-4 text-[#5C8F57]" />
              <span>Supabase Project Settings</span>
            </div>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-[#888888] hover:text-[#000000] font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-[#666666]">
            Enter your Supabase Project URL and Public Anon Key from Project Settings &gt; API:
          </p>

          <div>
            <label className="font-bold text-[#000000] block mb-1">Project URL</label>
            <input
              type="text"
              placeholder="https://xyzproject.supabase.co"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D6] text-xs font-mono focus:outline-none focus:border-[#5C8F57]"
            />
          </div>

          <div>
            <label className="font-bold text-[#000000] block mb-1">Anon Public Key</label>
            <input
              type="text"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKeyInput}
              onChange={(e) => setAnonKeyInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D6] text-xs font-mono focus:outline-none focus:border-[#5C8F57]"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-[#888888]">
              Saved securely in local browser storage
            </span>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#5C8F57] hover:bg-[#3F693A] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
            >
              Save Supabase Keys
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
