import { Upload, Trash2, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { mediaAssetUrl } from '../components/MediaPicker.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { Skeleton } from '../components/Skeleton.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';

export function MediaLibraryPage() {
  const [folder, setFolder] = useState('library');
  const [page, setPage] = useState(1);
  const { data, meta, loading, reload } = useApiResource('/media', { folder, page, limit: 20 });
  
  async function upload(files) {
    for (const file of Array.from(files || [])) {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      await api.post('/media', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    reload();
  }

  async function replace(id, file) {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    await api.put(`/media/${id}/replace`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
    reload();
  }

  async function remove(id) {
    if (window.confirm('Are you sure you want to permanently delete this media file? It will be removed anywhere it is used.')) {
      await api.delete(`/media/${id}`);
      reload();
    }
  }

  return (
    <>
      <PageHeader title="Media Library" description="Drag and drop uploads, folders, previews, image metadata, and video support." />
      <Card className="mb-5 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <input value={folder} onChange={(event) => { setFolder(event.target.value); setPage(1); }} className="rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            <Upload size={16} /> Upload files
            <input type="file" multiple className="hidden" onChange={(event) => upload(event.target.files)} />
          </label>
        </div>
      </Card>
      {loading ? <Skeleton /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => (
            <Card key={item._id} className="overflow-hidden group">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                {item.type === 'image' ? <img src={mediaAssetUrl(item)} alt={item.altText || item.originalName} className="h-full w-full object-cover" /> : <video src={mediaAssetUrl(item)} className="h-full w-full object-cover" controls />}
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold" title={item.originalName}>{item.originalName}</div>
                  <div className="text-xs text-slate-500">{Math.round(item.size / 1024)} KB</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <label className="cursor-pointer p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-brand-600 dark:hover:bg-slate-800" title="Replace file">
                    <RefreshCcw size={15} />
                    <input type="file" className="hidden" onChange={(e) => replace(item._id, e.target.files[0])} />
                  </label>
                  <button onClick={() => remove(item._id)} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-red-600 dark:hover:bg-slate-800" title="Delete file">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {meta && meta.pages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
          <div className="text-sm text-slate-500">
            Showing page <span className="font-semibold text-slate-900 dark:text-slate-100">{meta.page}</span> of <span className="font-semibold text-slate-900 dark:text-slate-100">{meta.pages}</span> ({meta.total} items)
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={meta.page <= 1} onClick={() => setPage(meta.page - 1)}>Previous</Button>
            <Button variant="secondary" disabled={meta.page >= meta.pages} onClick={() => setPage(meta.page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </>
  );
}
