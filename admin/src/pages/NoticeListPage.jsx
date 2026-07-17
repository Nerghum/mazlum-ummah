import { Edit, ExternalLink, Megaphone, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';
import { formatDate } from '../utils/format.js';
import { localizedValue } from '../utils/localized.js';
import { noticePreviewUrl } from '../utils/preview.js';

export function NoticeListPage() {
  const [filters, setFilters] = useState({ search: '', status: '' });
  const [selected, setSelected] = useState([]);
  const { data, loading, reload } = useApiResource('/notices', filters);

  function toggle(id) {
    setSelected((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function bulk(action) {
    await api.post('/notices/bulk', { ids: selected, action });
    setSelected([]);
    reload();
  }

  const columns = [
    { key: 'title', label: 'Title', render: (row) => <div><div className="font-semibold">{localizedValue(row.title, 'en') || localizedValue(row.title, 'bn')}</div><div className="text-xs text-slate-500">{localizedValue(row.title, 'bn')}</div><div className="text-xs text-slate-400">{row.slug}</div></div> },
    { key: 'status', label: 'Status', render: (row) => <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{row.status}</span> },
    { key: 'isPinned', label: 'Pinned', render: (row) => row.isPinned ? 'Yes' : 'No' },
    { key: 'publishDate', label: 'Publish date', render: (row) => formatDate(row.publishDate) },
    { key: 'expiresAt', label: 'Expires', render: (row) => formatDate(row.expiresAt) },
    { key: 'actions', label: 'Actions', render: (row) => <div className="flex items-center gap-2"><a href={noticePreviewUrl(row)} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600" title="View on site"><ExternalLink size={16} /></a><Link className="text-brand-600" to={`/notices/${row._id}/edit`}><Edit size={18} /></Link></div> }
  ];

  return (
    <>
      <PageHeader
        title="Notices"
        description="Create and manage public bilingual notices."
        actions={<Link to="/notices/create"><Button><Plus size={16} /> Create Notice</Button></Link>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Search notices" className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
        <select className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
          <option value="">All status</option><option>Draft</option><option>Published</option><option>Archived</option>
        </select>
        {!!selected.length && (
          <>
            <Button variant="secondary" onClick={() => bulk('publish')}><Megaphone size={16} /> Bulk publish</Button>
            <Button variant="secondary" onClick={() => bulk('archive')}>Bulk archive</Button>
            <Button variant="danger" onClick={() => bulk('delete')}><Trash2 size={16} /> Bulk delete</Button>
          </>
        )}
      </div>
      <DataTable columns={columns} rows={data} loading={loading} selected={selected} onSelect={toggle} />
    </>
  );
}
