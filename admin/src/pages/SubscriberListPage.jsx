import { Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { api } from '../services/api.js';
import { useApiResource } from '../hooks/useApiResource.js';
import { formatDate } from '../utils/format.js';

export function SubscriberListPage() {
  const [filters, setFilters] = useState({ search: '' });
  const { data, loading, reload } = useApiResource('/newsletter', filters);
  const [isExporting, setIsExporting] = useState(false);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      await api.delete(`/newsletter/${id}`);
      reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete subscriber');
    }
  }

  async function handleExport() {
    setIsExporting(true);
    try {
      const response = await api.get('/newsletter/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'subscribers.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert('Failed to export subscribers');
    } finally {
      setIsExporting(false);
    }
  }

  const columns = [
    { key: 'email', label: 'Email', render: (row) => <div className="font-semibold">{row.email}</div> },
    { key: 'status', label: 'Status', render: (row) => <span className={`rounded-full px-2 py-1 text-xs ${row.status === 'Subscribed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'}`}>{row.status}</span> },
    { key: 'language', label: 'Language', render: (row) => <span className="uppercase text-slate-500">{row.language}</span> },
    { key: 'source', label: 'Source', render: (row) => <span className="text-slate-500">{row.source || '-'}</span> },
    { key: 'createdAt', label: 'Date Subscribed', render: (row) => formatDate(row.createdAt) },
    { key: 'actions', label: 'Actions', render: (row) => <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 size={18} /></button> }
  ];

  return (
    <>
      <PageHeader
        title="Subscribers"
        description="Manage newsletter subscribers, export lists, and track signups."
        actions={<Button onClick={handleExport} disabled={isExporting}><Download size={16} /> {isExporting ? 'Exporting...' : 'Export CSV'}</Button>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input 
          placeholder="Search by email..." 
          className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" 
          value={filters.search} 
          onChange={(event) => setFilters({ ...filters, search: event.target.value })} 
        />
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </>
  );
}
