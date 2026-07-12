import { Edit2, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';
import { categoryPreviewUrl } from '../utils/preview.js';

export function CategoriesPage({ type = 'news' }) {
  const { data, loading, reload } = useApiResource('/categories', { type, limit: 1000 });
  const [editingId, setEditingId] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [initialBannerImage, setInitialBannerImage] = useState(null);
  const { register, handleSubmit, reset, control } = useForm({ defaultValues: { name: '', nameBn: '', sortOrder: 0, seoTitle: '', image: null, bannerImage: null, pageTitle: '', pageTitleBn: '', pageSubtitle: '', pageSubtitleBn: '' } });

  const title = type === 'blog' ? 'Blog Categories' : 'News Categories';

  async function save(values) {
    const payload = {
      ...values,
      type,
      sortOrder: Number(values.sortOrder),
      image: mediaId(values.image) || null,
      bannerImage: mediaId(values.bannerImage) || null
    };
    if (editingId) {
      await api.put(`/categories/${editingId}`, payload);
    } else {
      await api.post('/categories', payload);
    }
    cancelEdit();
    reload();
  }

  async function remove(id) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await api.delete(`/categories/${id}`);
      reload();
    }
  }

  function edit(row) {
    setEditingId(row._id);
    setInitialImage(row.image || null);
    setInitialBannerImage(row.bannerImage || null);
    reset({
      name: row.name,
      nameBn: row.nameBn || '',
      sortOrder: row.sortOrder || 0,
      seoTitle: row.seoTitle || '',
      image: row.image?._id || row.image || null,
      bannerImage: row.bannerImage?._id || row.bannerImage || null,
      pageTitle: row.pageTitle || '',
      pageTitleBn: row.pageTitleBn || '',
      pageSubtitle: row.pageSubtitle || '',
      pageSubtitleBn: row.pageSubtitleBn || ''
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setInitialImage(null);
    setInitialBannerImage(null);
    reset({ name: '', nameBn: '', sortOrder: 0, seoTitle: '', image: null, bannerImage: null, pageTitle: '', pageTitleBn: '', pageSubtitle: '', pageSubtitleBn: '' });
  }

  return (
    <>
      <PageHeader title={title} description={`Manage ${type} categories with SEO controls and images.`} />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Card className="p-5 h-fit">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">{editingId ? 'Edit Category' : 'Add Category'}</h2>
            {editingId && (
              <button onClick={cancelEdit} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <X size={18} />
              </button>
            )}
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(save)}>
            <FormField label="Name English"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('name')} required /></FormField>
            <FormField label="Name Bangla"><input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('nameBn')} required /></FormField>
            
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Category image" value={field.value} initialItems={initialImage} onChange={field.onChange} />
              )}
            />

            <Controller
              name="bannerImage"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Banner image" value={field.value} initialItems={initialBannerImage} onChange={field.onChange} />
              )}
            />

            <FormField label="Page title (English)"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageTitle')} /></FormField>
            <FormField label="Page title (Bangla)"><input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageTitleBn')} /></FormField>
            <FormField label="Page subtitle (English)"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageSubtitle')} /></FormField>
            <FormField label="Page subtitle (Bangla)"><input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageSubtitleBn')} /></FormField>
            <FormField label="Sort order"><input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('sortOrder')} /></FormField>
            <FormField label="SEO title"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('seoTitle')} /></FormField>
            <Button className="w-full"><Plus size={16} /> {editingId ? 'Update category' : 'Add category'}</Button>
          </form>
        </Card>
        <DataTable
          loading={loading}
          rows={data}
          columns={[
            {
              key: 'name',
              label: 'Name',
              render: (row) => (
                <div>
                  <div className="font-semibold">{row.name}</div>
                  <div className="text-xs text-slate-500">{row.nameBn || '-'}</div>
                </div>
              )
            },
            { key: 'slug', label: 'Slug' },
            { key: 'sortOrder', label: 'Sort' },
            {
              key: 'actions',
              label: '',
              render: (row) => {
                const previewUrl = categoryPreviewUrl(row, type);
                return (
                  <div className="flex justify-end gap-2">
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="p-1 text-slate-400 hover:text-emerald-600" title="Preview on site"><ExternalLink size={16} /></a>
                    <button onClick={() => edit(row)} className="p-1 text-slate-400 hover:text-brand-600"><Edit2 size={16} /></button>
                    <button onClick={() => remove(row._id)} className="p-1 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                );
              }
            }
          ]}
        />
      </div>
    </>
  );
}
