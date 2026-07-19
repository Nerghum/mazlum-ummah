import { Save, Download, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { RichTextEditor } from '../components/RichTextEditor.jsx';
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
        whatsappUrl: '',
        adminEmail: '',
        smtpHost: '',
        smtpPort: '587',
        smtpUser: '',
        smtpPass: ''
      },
      policy: {
        externalLinks: { bn: { title: '', subtitle: '', content: '' }, en: { title: '', subtitle: '', content: '' } },
        mazlumPolicy: { bn: { title: '', subtitle: '', content: '' }, en: { title: '', subtitle: '', content: '' } },
        privacy: { bn: { title: '', subtitle: '', content: '' }, en: { title: '', subtitle: '', content: '' } },
        cookies: { bn: { title: '', subtitle: '', content: '' }, en: { title: '', subtitle: '', content: '' } },
        copyright: { bn: { title: '', subtitle: '', content: '' }, en: { title: '', subtitle: '', content: '' } }
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

        <Card className="p-5">
          <h2 className="mb-4 font-semibold">Mail Settings</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField label="Admin Receiving Email">
              <input type="email" placeholder="admin@mazlumummah.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('contact.adminEmail')} />
            </FormField>
            <FormField label="SMTP Host (Webmail)">
              <input type="text" placeholder="mail.mazlumummah.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('contact.smtpHost')} />
            </FormField>
            <FormField label="SMTP Port">
              <input type="number" placeholder="587 or 465" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('contact.smtpPort')} />
            </FormField>
            <FormField label="SMTP Username">
              <input type="text" placeholder="info@mazlumummah.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('contact.smtpUser')} />
            </FormField>
            <FormField label="SMTP Password">
              <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('contact.smtpPass')} />
            </FormField>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-6">
            <h2 className="font-semibold">Static Pages (Policies)</h2>
          </div>
          
          <div className="space-y-8">
            {[
              { key: 'externalLinks', label: 'External Links Policy' },
              { key: 'mazlumPolicy', label: 'Mazlum Ummah Policy' },
              { key: 'privacy', label: 'Privacy Policy' },
              { key: 'cookies', label: 'Cookies' },
              { key: 'copyright', label: 'Copyright Policy' }
            ].map((policy) => (
              <div key={policy.key} className="p-4 border rounded-lg dark:border-slate-800">
                <h3 className="font-medium mb-4 text-slate-700 dark:text-slate-300">{policy.label}</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Bangla Column (Left) */}
                  <div className="space-y-4 border-r-0 xl:border-r border-slate-200 dark:border-slate-800 pr-0 xl:pr-6">
                    <h4 className="font-semibold text-sm text-slate-500 mb-2">Bangla</h4>
                    <FormField label="Page Title">
                      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`policy.${policy.key}.bn.title`)} />
                    </FormField>
                    <FormField label="Page Subtitle">
                      <textarea rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`policy.${policy.key}.bn.subtitle`)} />
                    </FormField>
                    <FormField label="Page Content">
                      <Controller
                        name={`policy.${policy.key}.bn.content`}
                        control={control}
                        render={({ field }) => (
                          <RichTextEditor
                            key={`policy-${policy.key}-bn`}
                            value={field.value}
                            onChange={field.onChange}
                            dir="auto"
                            lang="bn"
                          />
                        )}
                      />
                    </FormField>
                  </div>
                  
                  {/* English Column (Right) */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-slate-500 mb-2">English</h4>
                    <FormField label="Page Title">
                      <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`policy.${policy.key}.en.title`)} />
                    </FormField>
                    <FormField label="Page Subtitle">
                      <textarea rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`policy.${policy.key}.en.subtitle`)} />
                    </FormField>
                    <FormField label="Page Content">
                      <Controller
                        name={`policy.${policy.key}.en.content`}
                        control={control}
                        render={({ field }) => (
                          <RichTextEditor
                            key={`policy-${policy.key}-en`}
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            lang="en"
                          />
                        )}
                      />
                    </FormField>
                  </div>
                </div>
              </div>
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

