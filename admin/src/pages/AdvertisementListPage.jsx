import { BadgeDollarSign, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';
import { adPositionLabel } from '../utils/adPositions.js';

export function AdvertisementListPage() {
  const [filters, setFilters] = useState({ search: '', isActive: '' });
  const [selected, setSelected] = useState([]);
  const { data, loading, reload } = useApiResource('/advertisements', filters);

  function toggle(id) {
    setSelected((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function bulk(action) {
    await api.post('/advertisements/bulk', { ids: selected, action });
    setSelected([]);
    reload();
  }

  const columns = [
    { key: 'title', label: 'Title', render: (row) => <div><div className="font-semibold">{row.title}</div><div className="text-xs text-slate-500">{row.media?.originalName || 'No media selected'}</div></div> },
    { key: 'placements', label: 'Positions', render: (row) => <div className="flex max-w-sm flex-wrap gap-1">{(row.placements || []).map((item) => <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{adPositionLabel(item)}</span>)}</div> },
    { key: 'isActive', label: 'Active', render: (row) => row.isActive ? 'Yes' : 'No' },
    { key: 'priorityOrder', label: 'Order' },
    { key: 'actions', label: 'Actions', render: (row) => <Link className="text-brand-600" to={`/advertisements/${row._id}/edit`}><Edit size={18} /></Link> }
  ];

  return (
    <>
      <PageHeader
        title="Ads Management"
        description="Create image or GIF advertisements and assign them to frontend positions."
        actions={<Link to="/advertisements/create"><Button><Plus size={16} /> Create Ad</Button></Link>}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <input placeholder="Search ads" className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
        <select className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.isActive} onChange={(event) => setFilters({ ...filters, isActive: event.target.value })}>
          <option value="">All status</option><option value="true">Active</option><option value="false">Inactive</option>
        </select>
        {!!selected.length && (
          <>
            <Button variant="secondary" onClick={() => bulk('activate')}><BadgeDollarSign size={16} /> Activate</Button>
            <Button variant="secondary" onClick={() => bulk('deactivate')}>Deactivate</Button>
            <Button variant="danger" onClick={() => bulk('delete')}><Trash2 size={16} /> Delete</Button>
          </>
        )}
      </div>
      <DataTable columns={columns} rows={data} loading={loading} selected={selected} onSelect={toggle} />
    </>
  );
}
