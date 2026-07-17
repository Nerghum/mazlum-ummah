import { Save, Download, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';

function unflatten(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

export function SettingsPage() {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [initialMedia, setInitialMedia] = useState({ logo: null, favicon: null });
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      site: {
        title: 'Mazlum Ummah',
        tagline: 'For the Muslim Ummah',
        description: '',
        logo: null,
        favicon: null,
        facebookUrl: 'https://www.facebook.com/mazlumummah',
        youtubeUrl: 'https://www.youtube.com/@MazlumUmmah',
        linkedinUrl: 'https://www.linkedin.com/company/mazlum-ummah',
        instagramUrl: '',
        whatsappUrl: ''
      }
    }
  });

  useEffect(() => {
    api.get('/settings').then((response) => {
      const values = {};
      const media = { logo: null, favicon: null };
      response.data.data.forEach((item) => {
        values[item.key] = item.value;
        if (item.key === 'site.logo') media.logo = item.media || null;
        if (item.key === 'site.favicon') media.favicon = item.media || null;
      });
      setInitialMedia(media);
      reset(unflatten(values));
    });
  }, [reset]);

  async function onSubmit(values) {
    setSaving(true);
    try {
      await api.put('/settings', values);
      // Re-fetch to get the saved values and updated media references
      const response = await api.get('/settings');
      const freshValues = {};
      const media = { logo: null, favicon: null };
      response.data.data.forEach((item) => {
        freshValues[item.key] = item.value;
        if (item.key === 'site.logo') media.logo = item.media || null;
        if (item.key === 'site.favicon') media.favicon = item.media || null;
      });
      setInitialMedia(media);
      reset(unflatten(freshValues));
      dispatch(showToast('Settings saved'));
    } catch {
      dispatch(showToast('Failed to save settings'));
    } finally {
      setSaving(false);
    }
  }

  const handleExport = async () => {
    try {
      dispatch(showToast('Preparing export...'));
      const response = await api.get('/settings/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mazlum-ummah-backup.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      dispatch(showToast('Failed to export data'));
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!window.confirm('WARNING: Importing data will completely overwrite your existing database and media files. This action cannot be undone. Are you sure you want to proceed?')) {
      e.target.value = '';
      return;
    }
    
    const formData = new FormData();
    formData.append('backup', file);
    
    try {
      dispatch(showToast('Importing data... please wait'));
      await api.post('/settings/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(showToast('Data imported successfully. Reloading...'));
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      dispatch(showToast(error.response?.data?.message || 'Failed to import data'));
    } finally {
      e.target.value = '';
    }
  };

  return (
    <>
      <PageHeader title="Settings" description="Basic website identity and social links configuration." />
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-5">
          <h2 className="mb-4 font-semibold">Website identity</h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <FormField label="Website title">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('site.title')} />
            </FormField>
            <FormField label="Tagline">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('site.tagline')} />
            </FormField>
            <FormField label="Website description">
              <textarea rows="3" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('site.description')} />
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="site.logo"
                control={control}
                render={({ field }) => <MediaImageField label="Website logo" value={field.value} initialItems={initialMedia.logo} onChange={(value) => field.onChange(mediaId(value) || value)} />}
              />
              <Controller
                name="site.favicon"
                control={control}
                render={({ field }) => <MediaImageField label="Favicon / small logo" value={field.value} initialItems={initialMedia.favicon} onChange={(value) => field.onChange(mediaId(value) || value)} />}
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="mb-4 font-semibold">Social links</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {['site.facebookUrl', 'site.youtubeUrl', 'site.linkedinUrl', 'site.instagramUrl', 'site.whatsappUrl'].map((name) => (
              <FormField key={name} label={name.replace('site.', '')}>
                <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(name)} />
              </FormField>
            ))}
          </div>
        </Card>


        <Button type="submit" loading={saving}><Save size={16} /> Save settings</Button>
      </form>
      
      <div className="mt-8">
        <Card className="p-5 border-red-200 dark:border-red-900/50">
          <h2 className="mb-2 font-semibold text-red-600 dark:text-red-400">Data Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Export all your database collections and media files into a ZIP backup, or restore your entire site from a backup.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button type="button" variant="outline" onClick={handleExport}>
              <Download size={16} /> Export Data
            </Button>
            
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              <Upload size={16} /> Import Data
              <input type="file" accept=".zip" className="hidden" onChange={handleImport} />
            </label>
          </div>
        </Card>
      </div>
    </>
  );
}

