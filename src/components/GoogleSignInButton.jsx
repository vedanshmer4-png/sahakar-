import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function GoogleSignInButton({ role = 'worker', onSuccess, text = 'Continue with Google' }) {
  const { googleClientId, updateGoogleClientId, loginWithGoogle } = useAuth();
  const buttonRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);
  const [clientIdInput, setClientIdInput] = useState(googleClientId || '');
  const [isGsiLoaded, setIsGsiLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if Google GIS script is loaded in window
  useEffect(() => {
    const checkGsi = () => {
      if (window.google?.accounts?.id) {
        setIsGsiLoaded(true);
      }
    };

    checkGsi();
    const interval = setInterval(checkGsi, 500);
    return () => clearInterval(interval);
  }, []);

  // Initialize official GIS if clientId is provided
  useEffect(() => {
    if (isGsiLoaded && googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            const user = loginWithGoogle(response, role);
            if (onSuccess) onSuccess(user);
          },
          auto_select: false,
        });

        if (buttonRef.current) {
          buttonRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with',
            shape: 'pill',
          });
        }
      } catch (err) {
        console.warn('Google GSI initialization notice:', err);
      }
    }
  }, [isGsiLoaded, googleClientId, role]);

  // Click handler: if GIS button is rendered, it handles it; otherwise, triggers prompt or simulation
  const handleCustomGoogleClick = () => {
    setIsLoading(true);

    if (isGsiLoaded && googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback simulation for hackathon demo
            completeDemoLogin();
          }
        });
        return;
      } catch (e) {
        console.warn('Google prompt fallback:', e);
      }
    }

    // Demo/Hackathon fallback: instant authenticated session
    setTimeout(() => {
      completeDemoLogin();
    }, 600);
  };

  const completeDemoLogin = () => {
    setIsLoading(false);
    const mockGoogleCredential = {
      credential: null, // Simulated direct OAuth
    };
    const user = loginWithGoogle(mockGoogleCredential, role);
    if (onSuccess) onSuccess(user);
  };

  const handleSaveClientId = (e) => {
    e.preventDefault();
    updateGoogleClientId(clientIdInput.trim());
    setShowConfig(false);
  };

  return (
    <div className="w-full space-y-2">
      {/* Official GIS container if active */}
      {googleClientId && (
        <div ref={buttonRef} className="w-full flex justify-center mb-1" />
      )}

      {/* Styled Authentic Google Button */}
      {(!googleClientId || !isGsiLoaded) && (
        <button
          type="button"
          onClick={handleCustomGoogleClick}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#FDFBF7] text-[#3c4043] border border-[#dadce0] hover:border-[#c6c8cc] font-semibold text-sm shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer relative overflow-hidden"
        >
          {/* Authentic Google Multi-Color G Icon */}
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

          <span>{isLoading ? 'Connecting to Google...' : text}</span>

          {googleClientId ? (
            <span className="text-[10px] bg-[#D1FAE5] text-[#2D6A4F] px-2 py-0.5 rounded-full font-bold ml-auto">
              Google Console Linked
            </span>
          ) : (
            <span className="text-[10px] bg-[#FFF8F0] text-[#C45C3C] px-2 py-0.5 rounded-full font-bold ml-auto hidden sm:inline-block">
              One-Click Auth
            </span>
          )}
        </button>
      )}

      {/* Google Console Client ID Quick Connector Bar */}
      <div className="flex items-center justify-between text-[11px] text-[#736B63] px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D4A843]" />
          Google OAuth 2.0 Ready
        </span>
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="text-[#C45C3C] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Settings className="w-3 h-3" />
          {googleClientId ? 'Change Client ID' : 'Paste Google Client ID'}
        </button>
      </div>

      {/* Pop-out Google Client ID Settings */}
      {showConfig && (
        <form onSubmit={handleSaveClientId} className="p-3 bg-white rounded-xl border border-[#E8DFD8] shadow-sm space-y-2 text-xs animate-fade-in-up">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#2B2B2B]">Google Cloud Console Client ID</span>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-[#8C827A] hover:text-[#2B2B2B]"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-[#736B63]">
            Paste your Web Client ID from Google Cloud Console (APIs & Services &gt; Credentials):
          </p>
          <input
            type="text"
            placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
            value={clientIdInput}
            onChange={(e) => setClientIdInput(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-[#E8DFD8] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-[#8C827A]">
              Stored locally or in <code>.env</code>
            </span>
            <button
              type="submit"
              className="px-3 py-1 bg-[#2D6A4F] text-white rounded-lg font-bold text-xs hover:bg-[#1B4332]"
            >
              Save Client ID
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
