'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppUser } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAdminLoggedIn: boolean;
  isLoading: boolean;
  allUsers: AppUser[];
  addUser: (u: AppUser) => void;
  updateUser: (u: AppUser) => void;
  deleteUser: (email: string) => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  forceLogin: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<AppUser>) => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  authError: string | null;
  setAuthError: (err: string | null) => void;
  completeTest: (testDate?: Date) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'edutest_admin_session';
const USERS_DB_KEY = 'edutest_users_db';

const defaultDummyUsers: AppUser[] = [
  { email: 'admin@edutest.id', name: 'Super Administrator', firstName: 'Super', lastName: 'Administrator', username: 'admin', role: 'admin', pass: 'admin123' },
  { email: 'arjuna@remath.id', name: 'I Komang Arjuna Tudung Negara', firstName: 'Arjuna', lastName: 'Negara', username: 'arjuna_admin', role: 'admin', pass: 'admin123', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150' },
  { email: 'erida@remath.id', name: 'Eridayalma Zahra Yohar', firstName: 'Erida', lastName: 'Yohar', username: 'erida_admin', role: 'admin', pass: 'admin123', avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150' },
  { email: 'calizha@remath.id', name: 'Calizha', firstName: 'Calizha', lastName: '', username: 'calizha_user', role: 'user', pass: 'user123', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
  { email: 'michelle@remath.id', name: 'Michelle', firstName: 'Michelle', lastName: '', username: 'michelle_user', role: 'user', pass: 'user123', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
  { email: 'budi@remath.id', name: 'Budi Santoso', firstName: 'Budi', lastName: 'Santoso', username: 'budisantoso', role: 'user', pass: 'user123', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150' },
  { email: 'sarah@remath.id', name: 'Sarah Kirana', firstName: 'Sarah', lastName: 'Kirana', username: 'sarahkirana', role: 'user', pass: 'user123', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load Users DB
      const storedUsers = localStorage.getItem(USERS_DB_KEY);
      let usersToUse = defaultDummyUsers;
      if (storedUsers) {
        usersToUse = JSON.parse(storedUsers);
      } else {
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultDummyUsers));
      }
      setAllUsers(usersToUse);

      // Load Session
      const storedSession = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (storedSession) {
        const parsed: AppUser = JSON.parse(storedSession);
        // Validasi apakah user ada di DB
        const matched = usersToUse.find(u => u.email === parsed.email);
        if (matched) {
          setUser(parsed);
        } else {
          localStorage.removeItem(ADMIN_STORAGE_KEY);
        }
      }
    } catch {
      console.error('Failed to load auth data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUsersDB = (newUsers: AppUser[]) => {
    setAllUsers(newUsers);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(newUsers));
  };

  const addUser = (u: AppUser) => {
    if (!allUsers.find(x => x.email === u.email)) {
      saveUsersDB([...allUsers, u]);
    }
  };

  const updateUser = (u: AppUser) => {
    saveUsersDB(allUsers.map(x => x.email === u.email ? u : x));
  };

  const deleteUser = (email: string) => {
    saveUsersDB(allUsers.filter(x => x.email !== email));
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const e = email.trim().toLowerCase();
    
    const matchedUser = allUsers.find(u => u.email.toLowerCase() === e && u.pass === pass);

    if (matchedUser) {
      const now = new Date().toLocaleString('id-ID');
      const updatedUser: AppUser = {
        ...matchedUser,
        lastAccess: now,
        token: 'edu-jwt-mock-' + Date.now(),
      };
      
      // Update in DB
      updateUser(updatedUser);
      
      setUser(updatedUser);
      setAuthError(null);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch (err) {
        console.error('Storage write error', err);
      }
      return { success: true };
    } else {
      const err = 'Email atau kata sandi tidak valid.';
      setAuthError(err);
      return { success: false, error: err };
    }
  };

  const forceLogin = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const e = email.trim().toLowerCase();
    
    const matchedUser = allUsers.find(u => u.email.toLowerCase() === e);

    if (matchedUser) {
      const now = new Date().toLocaleString('id-ID');
      const updatedUser: AppUser = {
        ...matchedUser,
        lastAccess: now,
        token: 'edu-jwt-mock-' + Date.now(),
      };
      
      updateUser(updatedUser);
      setUser(updatedUser);
      setAuthError(null);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch (err) {
        console.error('Storage write error', err);
      }
      return { success: true };
    } else {
      const err = 'User tidak ditemukan.';
      setAuthError(err);
      return { success: false, error: err };
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch (e) {
      console.error('Storage remove error', e);
    }
    router.push('/');
  };

  const isAdminLoggedIn = !!user && user.role === 'admin';

  const updateProfile = (updates: Partial<AppUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    // update current session
    setUser(updatedUser);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }
    // update in DB
    updateUser(updatedUser);
  };

  const changePassword = (oldPass: string, newPass: string) => {
    if (!user) return { success: false, error: 'User not logged in' };
    
    if (user.pass !== oldPass) {
      return { success: false, error: 'Sandi Lama tidak sesuai.' };
    }
    
    const updatedUser = { ...user, pass: newPass };
    // update current session
    setUser(updatedUser);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }
    // update in DB
    updateUser(updatedUser);
    
    return { success: true };
  };

  const completeTest = (testDate: Date = new Date()) => {
    if (!user) return;

    let currentStreak = user.streakDays || 0;
    const lastDateStr = user.lastTestDate;
    
    if (lastDateStr) {
      const lastDate = new Date(lastDateStr);
      
      const isSameDay = testDate.getDate() === lastDate.getDate() && testDate.getMonth() === lastDate.getMonth() && testDate.getFullYear() === lastDate.getFullYear();
      
      const yesterday = new Date(testDate);
      yesterday.setDate(testDate.getDate() - 1);
      const isYesterday = yesterday.getDate() === lastDate.getDate() && yesterday.getMonth() === lastDate.getMonth() && yesterday.getFullYear() === lastDate.getFullYear();
      
      if (isSameDay) {
        // already completed a test today, no streak increment
      } else if (isYesterday) {
        currentStreak += 1;
      } else {
        // missed a day, reset streak to 1
        currentStreak = 1;
      }
    } else {
      // First test ever
      currentStreak = 1;
    }

    const updatedUser = { 
      ...user, 
      streakDays: currentStreak, 
      lastTestDate: testDate.toISOString() 
    };
    
    setUser(updatedUser);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (e) {
      console.error(e);
    }
    updateUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        allUsers,
        addUser,
        updateUser,
        deleteUser,
        isAuthenticated: !!user,
        isAdminLoggedIn,
        isLoading,
        login,
        forceLogin,
        logout,
        updateProfile,
        changePassword,
        authError,
        setAuthError,
        completeTest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
