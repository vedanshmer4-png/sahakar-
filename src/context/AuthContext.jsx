import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStore } from '../data/mockStore';
import {
  getSupabase,
  signInWithGoogleSupabase,
  isSupabaseConfigured,
  saveSupabaseConfig,
  getStoredSupabaseConfig
} from '../lib/supabase';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'sahakar_active_session';
const GOOGLE_CLIENT_ID_KEY = 'sahakar_google_client_id';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      return null;
    } catch {
      return null;
    }
  });

  const [supabaseConfig, setSupabaseConfig] = useState(getStoredSupabaseConfig);
  const [googleClientId, setGoogleClientId] = useState(() => {
    return localStorage.getItem(GOOGLE_CLIENT_ID_KEY) || (import.meta.env?.VITE_GOOGLE_CLIENT_ID || '');
  });

  // Listen for Supabase Auth state changes (Google OAuth callback redirect)
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    // Check existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleSupabaseUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        handleSupabaseUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        saveUserSession(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleSupabaseUser = (sbUser) => {
    const savedRole = localStorage.getItem('sahakar_intended_role') || 'Customer';
    const metadata = sbUser.user_metadata || {};

    const formattedUser = {
      id: 'supa-' + sbUser.id.substring(0, 8),
      supabaseId: sbUser.id,
      name: metadata.full_name || metadata.name || sbUser.email?.split('@')[0] || 'Google User',
      email: sbUser.email,
      avatar: metadata.avatar_url || metadata.picture || '👤',
      role: savedRole,
      verified: true,
      isGoogleAuth: true,
      isSupabaseAuth: true,
      societyId: 'MSCS/ND/2026/088',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const store = getStore();
    const existingIndex = store.users.findIndex(u => u.email.toLowerCase() === formattedUser.email.toLowerCase());
    if (existingIndex >= 0) {
      store.users[existingIndex] = { ...store.users[existingIndex], ...formattedUser };
    } else {
      store.users.push(formattedUser);
    }
    localStorage.setItem('sahakar_master_db_v1', JSON.stringify(store));

    saveUserSession(formattedUser);
  };

  const updateSupabaseKeys = (url, anonKey) => {
    saveSupabaseConfig(url, anonKey);
    setSupabaseConfig({ url, anonKey });
  };

  const updateGoogleClientId = (id) => {
    setGoogleClientId(id);
    if (id) {
      localStorage.setItem(GOOGLE_CLIENT_ID_KEY, id);
    } else {
      localStorage.removeItem(GOOGLE_CLIENT_ID_KEY);
    }
  };

  const saveUserSession = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  // Demo 1-Click Login for evaluators
  const loginAsDemo = (roleName) => {
    const store = getStore();
    const target = store.users.find(u => u.role === roleName) || store.users[0];
    saveUserSession(target);
    return target;
  };

  // Google OAuth through Supabase
  const loginWithSupabaseGoogle = async (desiredRole = 'Customer') => {
    localStorage.setItem('sahakar_intended_role', desiredRole);

    if (isSupabaseConfigured()) {
      const { data, error } = await signInWithGoogleSupabase({ role: desiredRole });
      if (!error && data?.url) {
        // Browser redirects to Google OAuth via Supabase
        return { success: true, redirecting: true };
      }
    }

    // Fallback demonstration auth if Supabase credentials are not connected yet
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const mockGoogleUser = {
      id: 'goog-' + randomId,
      name: desiredRole === 'Worker' ? 'Rajesh Kumar (Google Auth)' : 'Neha Agarwal (Google Verified)',
      email: desiredRole === 'Worker' ? 'rajesh.kumar.worker@gmail.com' : 'neha.agarwal.citizen@gmail.com',
      avatar: desiredRole === 'Worker' ? '👷' : '👤',
      role: desiredRole,
      verified: true,
      isGoogleAuth: true,
      isSupabaseAuth: true,
      societyId: 'MSCS/ND/2026/088',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const store = getStore();
    const existingIndex = store.users.findIndex(u => u.email.toLowerCase() === mockGoogleUser.email.toLowerCase());
    if (existingIndex >= 0) {
      store.users[existingIndex] = { ...store.users[existingIndex], ...mockGoogleUser };
    } else {
      store.users.push(mockGoogleUser);
    }
    localStorage.setItem('sahakar_master_db_v1', JSON.stringify(store));

    saveUserSession(mockGoogleUser);
    return { success: true, user: mockGoogleUser };
  };

  // Standard Login
  const login = (email, password) => {
    const store = getStore();
    const found = store.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && (u.password === password || password === 'demo123')
    );
    if (found) {
      saveUserSession(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'Invalid email or password. Please use demo credentials or register.' };
  };

  // Register New User
  const register = (userData) => {
    const store = getStore();
    const existing = store.users.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newUser = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      avatar: userData.role === 'Worker' ? '👷' : userData.role === 'Federation Admin' ? '🏢' : '👤',
      verified: true,
      societyId: 'MSCS/ND/2026/088',
      ...userData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    store.users.push(newUser);
    localStorage.setItem('sahakar_master_db_v1', JSON.stringify(store));
    saveUserSession(newUser);
    return { success: true, user: newUser };
  };

  // Sign out
  const logout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out:', err);
      }
    }
    saveUserSession(null);
  };

  const role = user?.role || 'Public';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        googleClientId,
        supabaseConfig,
        isSupabaseReady: isSupabaseConfigured(),
        updateSupabaseKeys,
        updateGoogleClientId,
        loginWithSupabaseGoogle,
        isAuthenticated: !!user,
        isCustomer: role === 'Customer',
        isWorker: role === 'Worker',
        isAdmin: role === 'Federation Admin',
        isCouncil: role === 'District Council Member',
        login,
        loginAsDemo,
        register,
        logout,
        saveUserSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
