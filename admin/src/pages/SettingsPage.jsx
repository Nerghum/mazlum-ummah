import { Save } from 'lucide-react';
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

function flatten(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      flatten(value, path, result);
    } else {
      result[path] = value;
    }
  }
  return result;
}

export function SettingsPage() {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);
  const [initialMedia, setInitialMedia] = useState({ logo: null, favicon: null });
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      'site.title': 'Mazlum Ummah',
      'site.tagline': 'For the Muslim Ummah',
      'site.description': '',
      'site.logo': null,
      'site.favicon': null,
      'site.facebookUrl': 'https://www.facebook.com/mazlumummah',
      'site.youtubeUrl': 'https://www.youtube.com/@MazlumUmmah',
      'site.linkedinUrl': 'https://www.linkedin.com/company/mazlum-ummah',
      'site.instagramUrl': '',
      'site.whatsappUrl': ''
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
      reset(values);
    });
  }, [reset]);

  async function onSubmit(values) {
    setSaving(true);
    try {
      await api.put('/settings', flatten(values));
      dispatch(showToast('Settings saved'));
    } catch {
      dispatch(showToast('Failed to save settings'));
    } finally {
      setSaving(false);
    }
  }

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
    </>
  );
}

