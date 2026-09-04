import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStore } from '../data/mockStore';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'sahakar_active_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default to logged-out for clean public view, or easy 1-click login
      return null;
    } catch {
      return null;
    }
  });

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

  // Standard Login
  const login = (email, password) => {
    const store = getStore();
    const found = store.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
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
    const newUser = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      ...userData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    store.users.push(newUser);
    localStorage.setItem('sahakar_master_db_v1', JSON.stringify(store));
    saveUserSession(newUser);
    return newUser;
  };

  // Sign out
  const logout = () => {
    saveUserSession(null);
  };

  const role = user?.role || 'Public';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
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
