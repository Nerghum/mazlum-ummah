import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';
import { formatDate } from '../utils/format.js';

export function SocialPostListPage() {
  const [filters, setFilters] = useState({ search: '', status: '', postType: '' });
  const [selected, setSelected] = useState([]);
  const { data, loading, reload } = useApiResource('/social-posts', filters);

  function toggle(id) {
    setSelected((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function bulk(action) {
    await api.post('/social-posts/bulk', { ids: selected, action });
    setSelected([]);
    reload();
  }

  const columns = [
    {
      key: 'content',
      label: 'Post',
      render: (row) => (
        <div>
          <div className="max-w-md whitespace-pre-line font-semibold">{row.content}</div>
          <div className="mt-1 text-xs text-slate-500">{(row.hashtags || []).join(' ')}</div>
        </div>
      )
    },
    { key: 'postType', label: 'Type', render: (row) => row.postType === 'video' ? 'Video' : 'Image' },
    { key: 'status', label: 'Status', render: (row) => <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{row.status}</span> },
    { key: 'isPinned', label: 'Pinned', render: (row) => row.isPinned ? 'Yes' : 'No' },
    { key: 'publishDate', label: 'Publish date', render: (row) => formatDate(row.publishDate) },
    { key: 'actions', label: 'Actions', render: (row) => <Link className="text-brand-600" to={`/social-posts/${row._id}/edit`}><Edit size={18} /></Link> }
  ];

  return (
    <>
      <PageHeader
        title="Social Posts"
        description="Create and manage single-language social feed posts for the public website."
        actions={<Link to="/social-posts/create"><Button><Plus size={16} /> Create Social Post</Button></Link>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Search social posts" className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
        <select className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
          <option value="">All status</option><option>Draft</option><option>Pending</option><option>Published</option><option>Archived</option>
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.postType} onChange={(event) => setFilters({ ...filters, postType: event.target.value })}>
          <option value="">All types</option><option value="image">Image</option><option value="video">Video</option>
        </select>
        {!!selected.length && (
          <>
            <Button variant="secondary" onClick={() => bulk('publish')}>Bulk publish</Button>
            <Button variant="secondary" onClick={() => bulk('archive')}>Bulk archive</Button>
            <Button variant="danger" onClick={() => bulk('delete')}><Trash2 size={16} /> Bulk delete</Button>
          </>
        )}
      </div>
      <DataTable columns={columns} rows={data} loading={loading} selected={selected} onSelect={toggle} />
    </>
  );
}
