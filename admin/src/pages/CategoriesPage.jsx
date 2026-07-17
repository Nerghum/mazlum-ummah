import { Edit2, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';
import { categoryPreviewUrl } from '../utils/preview.js';

export function CategoriesPage({ type = 'news' }) {
  const { data, loading, reload } = useApiResource('/categories', { type, limit: 1000 });
  const [editingId, setEditingId] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [initialBannerImage, setInitialBannerImage] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    mode: 'onSubmit',
    defaultValues: { name: '', nameBn: '', sortOrder: 0, seoTitle: '', seoDescription: '', image: null, bannerImage: null, pageTitle: '', pageTitleBn: '', pageSubtitle: '', pageSubtitleBn: '' }
  });

  const title = type === 'blog' ? 'Blog Categories' : 'News Categories';

  async function save(values) {
    const payload = {
      ...values,
      type,
      sortOrder: Number(values.sortOrder),
      image: mediaId(values.image) || null,
      bannerImage: mediaId(values.bannerImage) || null
    };
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, payload);
        dispatch(showToast('Category updated successfully'));
      } else {
        await api.post('/categories', payload);
        dispatch(showToast('Category created successfully'));
      }
      cancelEdit();
      reload();
    } catch (err) {
      dispatch(showToast(err?.response?.data?.message || 'Failed to save category'));
    }
  }

  function onInvalid(errs) {
    const fieldNames = {
      name: 'Name (English)',
      nameBn: 'Name (Bangla)',
      image: 'Category image',
      bannerImage: 'Banner image',
    };
    const missing = Object.keys(errs).map((k) => fieldNames[k] || k).join(', ');
    dispatch(showToast(`Required fields missing: ${missing}`));
  }

  async function remove(id) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        dispatch(showToast('Category deleted'));
        reload();
      } catch (err) {
        dispatch(showToast(err?.response?.data?.message || 'Failed to delete category'));
      }
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
      seoDescription: row.seoDescription || '',
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
    reset({ name: '', nameBn: '', sortOrder: 0, seoTitle: '', seoDescription: '', image: null, bannerImage: null, pageTitle: '', pageTitleBn: '', pageSubtitle: '', pageSubtitleBn: '' });
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
          <form className="space-y-4" onSubmit={handleSubmit(save, onInvalid)}>
            <FormField label="Name English (required)">
              <input className={`w-full rounded-lg border px-3 py-2 dark:bg-slate-950 ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`} {...register('name', { required: 'Name (English) is required' })} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </FormField>
            <FormField label="Name Bangla (required)">
              <input dir="auto" className={`w-full rounded-lg border px-3 py-2 dark:bg-slate-950 ${errors.nameBn ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`} {...register('nameBn', { required: 'Name (Bangla) is required' })} />
              {errors.nameBn && <p className="mt-1 text-xs text-red-500">{errors.nameBn.message}</p>}
            </FormField>
            
            <Controller
              name="image"
              control={control}
              rules={{ required: 'Category image is required' }}
              render={({ field }) => (
                <>
                  <MediaImageField label="Category image (required)" value={field.value} initialItems={initialImage} onChange={field.onChange} />
                  {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
                </>
              )}
            />

            <Controller
              name="bannerImage"
              control={control}
              rules={{ required: 'Banner image is required' }}
              render={({ field }) => (
                <>
                  <MediaImageField label="Banner image (required)" value={field.value} initialItems={initialBannerImage} onChange={field.onChange} />
                  {errors.bannerImage && <p className="mt-1 text-xs text-red-500">{errors.bannerImage.message}</p>}
                </>
              )}
            />

            <FormField label="Page title (English)"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageTitle')} /></FormField>
            <FormField label="Page title (Bangla)"><input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageTitleBn')} /></FormField>
            <FormField label="Page subtitle (English)"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageSubtitle')} /></FormField>
            <FormField label="Page subtitle (Bangla)"><input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('pageSubtitleBn')} /></FormField>
            <FormField label="Sort order"><input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('sortOrder')} /></FormField>
            <FormField label="SEO title"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('seoTitle')} /></FormField>
            <FormField label="SEO description"><textarea rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('seoDescription')} /></FormField>
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
