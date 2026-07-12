import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';
import { adPositionSize, adPositions, categoryAdPositions } from '../utils/adPositions.js';
import { useApiResource } from '../hooks/useApiResource.js';
import { localizedValue } from '../utils/localized.js';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  placements: z.array(z.string()).min(1, 'Select at least one position'),
  media: z.string().optional().nullable(),
  mobileMedia: z.string().optional().nullable(),
  targetUrl: z.string().optional(),
  altText: z.string().optional(),
  startsAt: z.string().optional(),
  endsAt: z.string().optional(),
  priorityOrder: z.coerce.number(),
  isActive: z.boolean()
});

const defaults = {
  title: '',
  placements: [],
  media: null,
  mobileMedia: null,
  targetUrl: '',
  altText: '',
  startsAt: '',
  endsAt: '',
  priorityOrder: 0,
  isActive: true
};

function toInputDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
}

function toIso(value) {
  return value ? new Date(value).toISOString() : '';
}

function normalizeAd(value) {
  return {
    ...defaults,
    ...value,
    media: mediaId(value?.media) || null,
    mobileMedia: mediaId(value?.mobileMedia) || null,
    startsAt: toInputDateTime(value?.startsAt),
    endsAt: toInputDateTime(value?.endsAt)
  };
}

export function AdvertisementEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialMedia, setInitialMedia] = useState(null);
  const [initialMobileMedia, setInitialMobileMedia] = useState(null);
  const { data: homepageSections } = useApiResource('/homepage-sections', { limit: 1000 });
  const { data: newsCategories } = useApiResource('/categories', { type: 'news', limit: 1000 });
  const { data: blogCategories } = useApiResource('/categories', { type: 'blog', limit: 1000 });
  const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: defaults });

  useEffect(() => {
    if (!id) return;
    api.get(`/advertisements/${id}`).then((response) => {
      const ad = response.data.data;
      setInitialMedia(ad.media || null);
      setInitialMobileMedia(ad.mobileMedia || null);
      reset(normalizeAd(ad));
    });
  }, [id, reset]);

  async function onSubmit(values) {
    const payload = {
      ...values,
      targetUrl: values.targetUrl?.trim() || '',
      startsAt: toIso(values.startsAt),
      endsAt: toIso(values.endsAt)
    };
    const response = id ? await api.put(`/advertisements/${id}`, payload) : await api.post('/advertisements', payload);
    dispatch(showToast(id ? 'Advertisement updated' : 'Advertisement created'));
    navigate(`/advertisements/${response.data.data._id}/edit`);
  }

  const selectedPlacements = watch('placements') || [];
  const dynamicPositions = homepageSections
    .filter((section) => section.type === 'Ad Slot' && section.adPosition)
    .map((section) => ({
      value: section.adPosition,
      label: `${localizedValue(section.title, 'en') || localizedValue(section.title, 'bn') || section.type} (${section.adPosition}) - ${adPositionSize(section.adPosition)}`,
      size: adPositionSize(section.adPosition)
    }));
  const categoryPositions = [
    ...newsCategories.flatMap((category) => categoryAdPositions(category, 'news')),
    ...blogCategories.flatMap((category) => categoryAdPositions(category, 'blog'))
  ];
  const positionOptions = [...adPositions, ...dynamicPositions, ...categoryPositions]
    .filter((position, index, items) => position.value && items.findIndex((item) => item.value === position.value) === index);

  return (
    <>
      <PageHeader title={id ? 'Edit Advertisement' : 'Create Advertisement'} description="Upload or select an image/GIF, add an optional link, and choose frontend positions." />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="grid gap-4">
            <FormField label="Ad title" error={errors.title?.message}>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('title')} />
            </FormField>
            <Controller
              name="media"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Desktop Ad image or GIF" value={field.value} initialItems={initialMedia} onChange={field.onChange} />
              )}
            />
            <Controller
              name="mobileMedia"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Mobile Ad image or GIF" value={field.value} initialItems={initialMobileMedia} onChange={field.onChange} />
              )}
            />
            <FormField label="Target link (optional)">
              <input placeholder="https://example.com" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('targetUrl')} />
            </FormField>
            <FormField label="Alt text">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('altText')} />
            </FormField>
            <FormField label="Frontend positions" error={errors.placements?.message}>
              <div className="grid max-h-[520px] gap-2 overflow-y-auto rounded-lg border border-slate-100 p-2 sm:grid-cols-2 dark:border-slate-800">
                {positionOptions.map((position) => (
                  <label key={position.value} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                    <input type="checkbox" value={position.value} {...register('placements')} checked={selectedPlacements.includes(position.value)} readOnly={false} />
                    <span>{position.label}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>
        </Card>
        <div className="space-y-5">
          <Card className="sticky top-20 z-10 p-5">
            <div className="space-y-4">
              <FormField label="Starts at"><input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('startsAt')} /></FormField>
              <FormField label="Ends at"><input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('endsAt')} /></FormField>
              <FormField label="Priority order"><input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('priorityOrder')} /></FormField>
              <label className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                <span>Active</span><input type="checkbox" {...register('isActive')} />
              </label>
              <Button className="w-full" loading={isSubmitting}><Save size={16} /> Save Ad</Button>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}
