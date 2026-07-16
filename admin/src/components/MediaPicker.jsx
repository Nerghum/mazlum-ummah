import { Check, ImagePlus, Search, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { classNames } from '../utils/format.js';
import { Button } from './Button.jsx';

export function mediaId(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item._id || item.id || '';
}

export function mediaAssetUrl(item) {
  if (!item?.url) return '';
  if (/^https?:\/\//.test(item.url)) return item.url;
  return `${(import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace('/api/v1', '')}${item.url}`;
}

function normalizeItems(items) {
  return (Array.isArray(items) ? items : [items]).filter(Boolean);
}

export function MediaPicker({ open, multiple = false, value, initialItems = [], onClose, onSelect }) {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedMedia = useMemo(() => {
    const known = [...normalizeItems(initialItems), ...items];
    return selectedIds.map((id) => known.find((item) => mediaId(item) === id)).filter(Boolean);
  }, [initialItems, items, selectedIds]);

  async function load() {
    setLoading(true);
    const response = await api.get('/media', { params: { type: 'image', search, limit: 80, sort: '-createdAt' } });
    setItems(response.data.data.items || response.data.data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (!open) return;
    const ids = multiple ? normalizeItems(value).map(mediaId).filter(Boolean) : [mediaId(value)].filter(Boolean);
    setSelectedIds(ids);
    load();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [search]);

  async function upload(files) {
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of selectedFiles) {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', 'library');
      const response = await api.post('/media', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      uploaded.push(response.data.data);
    }
    setItems((current) => [...uploaded, ...current]);
    setSelectedIds((current) => multiple ? [...new Set([...current, ...uploaded.map(mediaId)])] : [mediaId(uploaded[0])]);
    setUploading(false);
  }

  function toggle(item) {
    const id = mediaId(item);
    if (!multiple) {
      setSelectedIds([id]);
      onSelect(item);
      onClose();
      return;
    }
    setSelectedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  }

  function confirmSelection() {
    if (multiple) onSelect(selectedMedia);
    else onSelect(selectedMedia[0] || null);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold">Choose image</h2>
            <p className="text-sm text-slate-500">Upload new images or select from Media Library.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            <Upload size={16} /> {uploading ? 'Uploading...' : multiple ? 'Upload images' : 'Upload image'}
            <input type="file" accept="image/*,.ico,.icon" multiple={multiple} className="hidden" onChange={(event) => upload(event.target.files)} />
          </label>
          <div className="relative min-w-64 flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search old media"
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => <div key={index} className="aspect-square animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />)}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {items.map((item) => {
                const selected = selectedIds.includes(mediaId(item));
                return (
                  <button
                    key={mediaId(item)}
                    type="button"
                    onClick={() => toggle(item)}
                    className={classNames(
                      'group relative overflow-hidden rounded-lg border text-left',
                      selected ? 'border-brand-600 ring-2 ring-brand-600/30' : 'border-slate-200 dark:border-slate-800'
                    )}
                  >
                    <img src={mediaAssetUrl(item)} alt={item.altText || item.originalName} className="aspect-square w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/65 p-2 text-xs font-medium text-white">
                      <div className="truncate">{item.originalName}</div>
                    </div>
                    {selected && <span className="absolute right-2 top-2 rounded-full bg-brand-600 p-1 text-white"><Check size={14} /></span>}
                  </button>
                );
              })}
            </div>
          )}
          {!loading && !items.length && <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">No images found.</div>}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="text-sm text-slate-500">{selectedIds.length} selected</div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="button" onClick={confirmSelection}>Use selected</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MediaImageField({ label, multiple = false, value, initialItems = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(normalizeItems(initialItems));

  useEffect(() => {
    setSelectedItems(normalizeItems(initialItems));
  }, [JSON.stringify(normalizeItems(initialItems).map(mediaId))]);

  const selectedIds = multiple ? normalizeItems(value).map(mediaId).filter(Boolean) : [mediaId(value)].filter(Boolean);
  const visibleItems = selectedIds.map((id) => selectedItems.find((item) => mediaId(item) === id)).filter(Boolean);

  function handleSelect(selection) {
    const items = normalizeItems(selection);
    setSelectedItems((current) => {
      const merged = [...current];
      for (const item of items) {
        if (!merged.some((existing) => mediaId(existing) === mediaId(item))) merged.push(item);
      }
      return merged;
    });
    onChange(multiple ? items.map(mediaId) : mediaId(items[0]));
  }

  function remove(id) {
    if (multiple) onChange(selectedIds.filter((itemId) => itemId !== id));
    else onChange(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">{label}</h2>
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}><ImagePlus size={16} /> {selectedIds.length ? 'Change' : 'Select'}</Button>
      </div>
      {visibleItems.length ? (
        <div className={multiple ? 'grid grid-cols-2 gap-3' : ''}>
          {visibleItems.map((item) => (
            <div key={mediaId(item)} className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <img src={mediaAssetUrl(item)} alt={item.altText || item.originalName} className={multiple ? 'aspect-square w-full object-cover' : 'aspect-video w-full object-cover'} />
              <button type="button" onClick={() => remove(mediaId(item))} className="absolute right-2 top-2 rounded-lg bg-slate-950/75 p-1.5 text-white opacity-0 transition group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm font-semibold text-slate-500 dark:border-slate-700">
          Select {multiple ? 'gallery images' : 'thumbnail image'}
        </button>
      )}
      <MediaPicker open={open} multiple={multiple} value={value} initialItems={selectedItems} onClose={() => setOpen(false)} onSelect={handleSelect} />
    </div>
  );
}
