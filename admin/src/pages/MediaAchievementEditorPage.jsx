import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, Languages, Play, Save, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { MediaImageField, mediaId } from '../components/MediaPicker.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { PrintNewsPreview } from '../components/PrintNewsPreview.jsx';
import { RichTextEditor } from '../components/RichTextEditor.jsx';
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';
import { emptyLocalized } from '../utils/localized.js';
import { mediaAchievementPreviewUrl } from '../utils/preview.js';
import { youtubeEmbedUrl } from '../utils/video.js';

const localizedSchema = z.object({
  en: z.string().optional(),
  bn: z.string().optional()
}).refine((value) => (value.en || '').trim() || (value.bn || '').trim(), 'English or Bangla is required');

const optionalLocalizedSchema = z.object({ en: z.string().optional(), bn: z.string().optional() });

const schema = z.object({
  title: localizedSchema,
  subtitle: optionalLocalizedSchema,
  shortDescription: optionalLocalizedSchema,
  content: localizedSchema,
  source: optionalLocalizedSchema,
  linkLabel: optionalLocalizedSchema,
  achievementDate: optionalLocalizedSchema,
  externalUrl: z.string().optional(),
  cardType: z.enum(['photo', 'accent']),
  status: z.enum(['Draft', 'Pending', 'Published', 'Archived']),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  language: z.enum(['en', 'bn', 'both']),
  isFeatured: z.boolean(),
  thumbnailImage: z.string().optional().nullable(),
  imageGallery: z.array(z.string()).optional(),
  videoUrl: z.string().optional()
});

const defaults = {
  title: emptyLocalized(),
  subtitle: emptyLocalized(),
  shortDescription: emptyLocalized(),
  content: emptyLocalized(),
  source: emptyLocalized(),
  linkLabel: { en: 'Read article', bn: 'আর্টিকেল দেখুন' },
  achievementDate: emptyLocalized(),
  externalUrl: '',
  cardType: 'photo',
  status: 'Draft',
  seoTitle: '',
  seoDescription: '',
  language: 'both',
  isFeatured: false,
  thumbnailImage: null,
  imageGallery: [],
  videoUrl: ''
};

function normalizeLocalized(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function normalizeAchievement(value) {
  return {
    ...defaults,
    ...value,
    title: normalizeLocalized(value?.title),
    subtitle: normalizeLocalized(value?.subtitle),
    shortDescription: normalizeLocalized(value?.shortDescription),
    content: normalizeLocalized(value?.content),
    source: normalizeLocalized(value?.source),
    linkLabel: normalizeLocalized(value?.linkLabel),
    achievementDate: normalizeLocalized(value?.achievementDate),
    thumbnailImage: mediaId(value?.thumbnailImage) || null,
    imageGallery: Array.isArray(value?.imageGallery) ? value.imageGallery.map(mediaId).filter(Boolean) : [],
    videoUrl: value?.videoUrl || '',
    externalUrl: value?.externalUrl || '',
    cardType: value?.cardType || 'photo'
  };
}

export function MediaAchievementEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeLang, setActiveLang] = useState('bn');
  const [featuredMode, setFeaturedMode] = useState('image');
  const [initialMedia, setInitialMedia] = useState({ thumbnailImage: null, imageGallery: [] });
  const [previewUrl, setPreviewUrl] = useState('');
  const { register, handleSubmit, control, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: defaults });

  useEffect(() => {
    if (id) {
      api.get(`/media-achievements/${id}`).then((response) => {
        const item = response.data.data;
        setInitialMedia({
          thumbnailImage: item.thumbnailImage || null,
          imageGallery: Array.isArray(item.imageGallery) ? item.imageGallery : []
        });
        setFeaturedMode(item.videoUrl ? 'video' : 'image');
        setPreviewUrl(mediaAchievementPreviewUrl(item));
        reset(normalizeAchievement(item));
      });
    } else {
      setInitialMedia({ thumbnailImage: null, imageGallery: [] });
      setFeaturedMode('image');
      setPreviewUrl('');
      reset(defaults);
    }
  }, [id, reset]);

  async function onSubmit(values) {
    const payload = {
      ...values,
      externalUrl: values.externalUrl?.trim() || '',
      videoUrl: values.videoUrl?.trim() || '',
      thumbnailImage: values.videoUrl?.trim() ? null : values.thumbnailImage
    };
    const response = id ? await api.put(`/media-achievements/${id}`, payload) : await api.post('/media-achievements', payload);
    setPreviewUrl(mediaAchievementPreviewUrl(response.data.data));
    dispatch(showToast(id ? 'Media achievement updated' : 'Media achievement created'));
    navigate('/media-achievements');
  }

  function onError() {
    dispatch(showToast('Please fill out all mandatory fields.'));
  }

  const videoUrl = watch('videoUrl');
  const videoEmbedUrl = youtubeEmbedUrl(videoUrl);

  return (
    <>
      <PageHeader title={id ? 'Edit Media Achievement' : 'Create Media Achievement'} description="Write bilingual press highlights, media mentions, awards, and recognition posts." actions={id ? <Link to="/media-achievements/create"><Button><Plus size={16} /> Add New</Button></Link> : null} />
      <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2 font-semibold"><Languages size={18} /> Achievement language content</div>
            <div className="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
              {[['en', 'English'], ['bn', 'বাংলা']].map(([code, label]) => (
                <button key={code} type="button" className={`rounded-md px-3 py-1.5 text-sm font-semibold ${activeLang === code ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'}`} onClick={() => setActiveLang(code)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <FormField label={activeLang === 'bn' ? 'Title Bangla' : 'Title English'} error={errors.title?.message}>
              <input key={`title-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`title.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Subtitle Bangla' : 'Subtitle English'}>
              <input key={`subtitle-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`subtitle.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Short description Bangla' : 'Short description English'}>
              <textarea key={`shortDescription-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} rows="3" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`shortDescription.${activeLang}`)} />
            </FormField>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField label={activeLang === 'bn' ? 'Source Bangla' : 'Source English'}>
                <input key={`source-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`source.${activeLang}`)} />
              </FormField>
              <FormField label={activeLang === 'bn' ? 'Date Bangla' : 'Date English'}>
                <input key={`achievementDate-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} placeholder={activeLang === 'bn' ? 'এপ্রিল ২০২৬' : 'April 2026'} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`achievementDate.${activeLang}`)} />
              </FormField>
              <FormField label={activeLang === 'bn' ? 'Link label Bangla' : 'Link label English'}>
                <input key={`linkLabel-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`linkLabel.${activeLang}`)} />
              </FormField>
            </div>
            <FormField label={activeLang === 'bn' ? 'Content Bangla' : 'Content English'} error={errors.content?.message}>
              <Controller name={`content.${activeLang}`} control={control} render={({ field }) => <RichTextEditor key={`content-${activeLang}`} value={field.value} onChange={field.onChange} dir="auto" lang={activeLang} />} />
            </FormField>
          </div>
        </Card>
        <div className="space-y-5">
          {previewUrl && (
            <Card className="p-5">
              <h2 className="mb-3 font-semibold">Public preview</h2>
              <div className="space-y-3">
                <input readOnly value={previewUrl} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <a href={previewUrl} target="_blank" rel="noreferrer" className="block">
                  <Button type="button" variant="secondary" className="w-full"><ExternalLink size={16} /> Open preview</Button>
                </a>
              </div>
            </Card>
          )}
          <Card className="p-5">
            <div className="space-y-4">
              <FormField label="Card type">
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('cardType')}>
                  <option value="photo">Photo card</option>
                  <option value="accent">Accent card</option>
                </select>
              </FormField>
              <FormField label="External URL">
                <input placeholder="https://example.com/article" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('externalUrl')} />
              </FormField>
            </div>
          </Card>
          <Card className="p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">Thumbnail</h2>
                <div className="inline-flex rounded-lg border border-slate-200 p-1 text-xs font-semibold dark:border-slate-700">
                  {[
                    ['image', 'Image'],
                    ['video', 'YouTube']
                  ].map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      className={`rounded-md px-2.5 py-1.5 ${featuredMode === mode ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                      onClick={() => {
                        setFeaturedMode(mode);
                        if (mode === 'image') setValue('videoUrl', '');
                        if (mode === 'video') setValue('thumbnailImage', null);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {featuredMode === 'image' ? (
                <Controller
                  name="thumbnailImage"
                  control={control}
                  render={({ field }) => (
                    <MediaImageField label="Featured image" value={field.value} initialItems={initialMedia.thumbnailImage} onChange={field.onChange} />
                  )}
                />
              ) : (
                <FormField label="YouTube video URL">
                  <input placeholder="https://www.youtube.com/watch?v=..." className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('videoUrl')} />
                  {videoEmbedUrl ? (
                    <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-slate-950">
                      <iframe src={videoEmbedUrl} title="YouTube preview" className="h-full w-full" allowFullScreen />
                    </div>
                  ) : (
                    <div className="mt-3 flex aspect-video items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700">
                      <Play size={16} className="mr-2" /> Paste a YouTube URL to preview
                    </div>
                  )}
                </FormField>
              )}
            </div>
          </Card>
          <Card className="p-5">
            <Controller
              name="imageGallery"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Image gallery" multiple value={field.value || []} initialItems={initialMedia.imageGallery} onChange={field.onChange} />
              )}
            />
          </Card>
          <Card className="sticky top-20 z-10 p-5">
            <div className="space-y-4">
              <FormField label="Status"><select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('status')}><option>Draft</option><option>Pending</option><option>Published</option><option>Archived</option></select></FormField>
              <FormField label="Publishing language">
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('language')}>
                  <option value="both">Bangla + English</option>
                  <option value="en">English only</option>
                  <option value="bn">Bangla only</option>
                </select>
              </FormField>
              {['isFeatured'].map((name) => (
                <label key={name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                  <span className="capitalize">{name.replace(/([A-Z])/g, ' $1')}</span><input type="checkbox" {...register(name)} />
                </label>
              ))}
              <Button className="w-full" loading={isSubmitting}><Save size={16} /> Save Achievement</Button>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="mb-4 font-semibold">SEO settings</h2>
            <div className="space-y-4">
              <FormField label="SEO title"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('seoTitle')} /></FormField>
              <FormField label="SEO description"><textarea rows="3" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('seoDescription')} /></FormField>
            </div>
          </Card>
        </div>
      </form>
      <div className="mt-6">
        <PrintNewsPreview news={watch()} />
      </div>
    </>
  );
}
