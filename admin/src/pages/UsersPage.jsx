import { Plus, Edit, Trash2, X, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';

const roles = ['Super Admin', 'Admin', 'Editor', 'Journalist', 'Moderator'];
const defaultValues = { name: '', email: '', password: '', role: 'Journalist' };

export function UsersPage() {
  const { data, loading, reload } = useApiResource('/users');
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState('');
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  async function save(values) {
    if (editingId) {
      const payload = { ...values };
      if (!payload.password) delete payload.password;
      await api.put(`/users/${editingId}`, payload);
      setNotification('User updated successfully');
    } else {
      await api.post('/users', values);
      setNotification('User created successfully');
    }
    setEditingId(null);
    reset(defaultValues);
    reload();
    setTimeout(() => setNotification(''), 3000);
  }

  function handleEdit(row) {
    setEditingId(row._id);
    reset({ name: row.name, email: row.email, password: '', role: row.role });
  }

  function handleCancelEdit() {
    setEditingId(null);
    reset(defaultValues);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    await api.delete(`/users/${id}`);
    reload();
  }

  return (
    <>
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle size={18} />
          {notification}
        </div>
      )}
      <PageHeader title="Users" description="Manage newsroom users, roles, and RBAC access." />
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="p-5">
          <form className="space-y-4" onSubmit={handleSubmit(save)}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{editingId ? 'Edit User' : 'Add New User'}</h3>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="text-slate-500 hover:text-slate-700">
                  <X size={16} />
                </button>
              )}
            </div>
            <FormField label="Name"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('name')} /></FormField>
            <FormField label="Email"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('email')} /></FormField>
            <FormField label={editingId ? "Password (leave blank to keep)" : "Password"}><input type="password" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('password')} /></FormField>
            <FormField label="Role"><select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('role')}>{roles.map((role) => <option key={role}>{role}</option>)}</select></FormField>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? <><Edit size={16} /> Update user</> : <><Plus size={16} /> Add user</>}
              </Button>
            </div>
          </form>
        </Card>
        <DataTable 
          loading={loading} 
          rows={data} 
          columns={[
            { key: 'name', label: 'Name' }, 
            { key: 'email', label: 'Email' }, 
            { key: 'role', label: 'Role' }, 
            { key: 'isActive', label: 'Active', render: (row) => row.isActive ? 'Yes' : 'No' },
            { 
              key: 'actions', 
              label: 'Actions', 
              render: (row) => (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(row)} className="text-brand-600 hover:text-brand-700 p-1"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(row._id)} className="text-red-600 hover:text-red-700 p-1"><Trash2 size={16} /></button>
                </div>
              ) 
            }
          ]} 
        />
      </div>
    </>
  );
}
