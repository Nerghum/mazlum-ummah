import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { api } from '../services/api.js';
import { useApiResource } from '../hooks/useApiResource.js';
import { formatDate } from '../utils/format.js';
import { localizedValue } from '../utils/localized.js';

export function NewsListPage() {
  const [filters, setFilters] = useState({ search: '', status: '' });
  const [selected, setSelected] = useState([]);
  const { data, loading, reload } = useApiResource('/news', filters);

  function toggle(id) {
    setSelected((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function bulk(action) {
    await api.post('/news/bulk', { ids: selected, action });
    setSelected([]);
    reload();
  }

  const columns = [
    { key: 'title', label: 'Title', render: (row) => <div><div className="font-semibold">{localizedValue(row.title, 'en') || localizedValue(row.title, 'bn')}</div><div className="text-xs text-slate-500">{localizedValue(row.title, 'bn')}</div><div className="text-xs text-slate-400">{row.slug}</div></div> },
    { key: 'status', label: 'Status', render: (row) => <span className={`rounded-full px-2 py-1 text-xs ${row.status === 'Scheduled' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-slate-100 dark:bg-slate-800'}`}>{row.status}</span> },
    { key: 'mainCategory', label: 'Category', render: (row) => row.mainCategory?.name || row.mainCategory?.nameBn || '-' },
    { key: 'views', label: 'Views' },
    { key: 'publishDate', label: 'Publish date', render: (row) => formatDate(row.scheduledPublishDate || row.publishDate) },
    { key: 'actions', label: 'Actions', render: (row) => <Link className="text-brand-600" to={`/news/${row._id}/edit`}><Edit size={18} /></Link> }
  ];

  return (
    <>
      <PageHeader
        title="News List"
        description="Search, filter, bulk publish, and maintain all editorial content."
        actions={<Link to="/news/create"><Button><Plus size={16} /> Create News</Button></Link>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Search news" className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
        <select className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
          <option value="">All status</option><option>Draft</option><option>Pending</option><option>Scheduled</option><option>Published</option><option>Archived</option>
        </select>
        <Button type="button" variant={filters.status === 'Scheduled' ? 'primary' : 'secondary'} onClick={() => setFilters({ ...filters, status: filters.status === 'Scheduled' ? '' : 'Scheduled' })}>Scheduled News</Button>
        {!!selected.length && (
          <>
            <Button variant="secondary" onClick={() => bulk('publish')}>Bulk publish</Button>
            <Button variant="danger" onClick={() => bulk('delete')}><Trash2 size={16} /> Bulk delete</Button>
          </>
        )}
      </div>
      <DataTable columns={columns} rows={data} loading={loading} selected={selected} onSelect={toggle} />
    </>
  );
}
