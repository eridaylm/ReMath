'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/admin-header';
import Footer from '@/components/layout/footer';
import AdminGuard from '@/components/layout/admin-guard';
import { useAuth } from '@/context/AuthContext';
import { AppUser } from '@/types';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Layers,
  LogOut,
  X,
  Users,
  Shield,
  Clock
} from 'lucide-react';

export default function AdminUsersPage() {
  const { user, logout, allUsers, addUser, updateUser, deleteUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [deletingUserEmail, setDeletingUserEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: 'admin' | 'user';
    pass: string;
  }>({
    name: '',
    email: '',
    role: 'user',
    pass: '',
  });

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: allUsers.length,
    admins: allUsers.filter(u => u.role === 'admin').length,
    users: allUsers.filter(u => u.role === 'user').length,
  };

  const openAddModal = () => {
    setFormData({ name: '', email: '', role: 'user', pass: 'user123' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (u: AppUser) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      role: u.role,
      pass: u.pass || '',
    });
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (allUsers.find(u => u.email === formData.email)) {
      alert("Email sudah terdaftar!");
      return;
    }
    addUser({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      pass: formData.pass,
    });
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser({
      ...editingUser,
      name: formData.name,
      role: formData.role,
      pass: formData.pass,
    });
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    if (deletingUserEmail) {
      if (deletingUserEmail === user?.email) {
        alert("Anda tidak bisa menghapus akun anda sendiri saat sedang login!");
      } else {
        deleteUser(deletingUserEmail);
      }
      setDeletingUserEmail(null);
    }
  };

  const getInitials = (u: AppUser) => {
    const isDefault = !u.username || u.username.endsWith('_user') || u.username.endsWith('_admin');
    if (isDefault) {
      const first = u.firstName || (u.name ? u.name.split(' ')[0] : '?');
      return first.substring(0, 1).toUpperCase();
    }
    return u.username?.substring(0, 1).toUpperCase() || '?';
  };

  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <AdminHeader />

        <main className="flex-1 pb-16">
          <div className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                      Panel Manajemen Akun
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ID Admin: {user?.email}
                    </span>
                  </div>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    Manajemen Pengguna
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Kelola data Admin dan Peserta didik (User) di platform ReMath.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/admin/questions"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition shadow-sm"
                  >
                    <Layers className="h-3.5 w-3.5 text-slate-500" />
                    <span>Manajemen Bank Soal</span>
                  </Link>

                  <button
                    onClick={openAddModal}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Tambah User Baru</span>
                  </button>

                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 transition"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>

              {/* Stat Counters */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Akun Terdaftar</span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</span>
                    <span className="text-xs text-slate-400">akun</span>
                  </div>
                </div>
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-3.5 dark:border-indigo-900/40 dark:bg-indigo-950/20">
                  <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Total Admin</span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.admins}</span>
                    <span className="text-xs text-indigo-600/70 dark:text-indigo-400">akun admin</span>
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Total User Aktif</span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{stats.users}</span>
                    <span className="text-xs text-emerald-600/70 dark:text-emerald-400">pelajar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berdasarkan nama atau email..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                    <tr>
                      <th className="py-3 px-4 w-48">Nama Pengguna</th>
                      <th className="py-3 px-4 w-48">Email</th>
                      <th className="py-3 px-4 w-24">Role</th>
                      <th className="py-3 px-4 w-24 text-center">Password</th>
                      <th className="py-3 px-4 w-32">Terakhir Akses (Login)</th>
                      <th className="py-3 px-4 w-28 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                          <Users className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                          <p className="text-sm font-semibold">Tidak ada user yang ditemukan.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        return (
                          <tr key={u.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 dark:border-slate-700 dark:bg-blue-900/40 dark:text-blue-300">
                                  {u.avatarUrl ? (
                                    <img src={u.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                                  ) : (
                                    <span className="text-xs font-bold">
                                      {getInitials(u)}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span>{u.name}</span>
                                  {u.username && <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">@{u.username}</span>}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                              {u.email}
                            </td>
                            <td className="py-3 px-4">
                              {u.role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-800">
                                  <Shield className="h-3 w-3" /> Admin
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800">
                                  <Users className="h-3 w-3" /> User
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-center font-mono">
                              <span className="text-slate-400">••••••••</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 text-slate-400" />
                                <span>{u.lastAccess || 'Belum Pernah'}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => openEditModal(u)}
                                  className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeletingUserEmail(u.email)}
                                  className="rounded-md border border-rose-200 p-1.5 text-rose-600 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* Modal: Add User */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tambah User Baru</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSaveNew} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input required type="text" value={formData.pass} onChange={(e) => setFormData({...formData, pass: e.target.value})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as 'admin'|'user'})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                    <option value="user">User (Pelajar)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="rounded-lg border px-4 py-2 text-xs font-semibold">Batal</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit User */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit User: {editingUser.email}</h3>
                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input required type="text" value={formData.pass} onChange={(e) => setFormData({...formData, pass: e.target.value})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as 'admin'|'user'})} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                    <option value="user">User (Pelajar)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setEditingUser(null)} className="rounded-lg border px-4 py-2 text-xs font-semibold">Batal</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Delete User */}
        {deletingUserEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Hapus User Ini?</h3>
              <p className="mt-2 text-xs text-slate-500">Email: {deletingUserEmail}</p>
              <div className="mt-5 flex justify-center gap-2">
                <button onClick={() => setDeletingUserEmail(null)} className="rounded-lg border px-4 py-2 text-xs font-semibold">Batal</button>
                <button onClick={handleConfirmDelete} className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white">Ya, Hapus</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
