import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, ExternalLink, Languages, Play, Save, Plus } from 'lucide-react';
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
import { useSaveState } from '../hooks/useSaveState.js';
import { useApiResource } from '../hooks/useApiResource.js';
import { showToast } from '../store/uiSlice.js';
import { copyText } from '../utils/clipboard.js';
import { emptyLocalized } from '../utils/localized.js';
import { newsPreviewUrl, shortlinkUrl } from '../utils/preview.js';
import { youtubeEmbedUrl } from '../utils/video.js';

const localizedSchema = z.object({
  en: z.string().optional(),
  bn: z.string().optional()
}).refine((value) => (value.en || '').trim() || (value.bn || '').trim(), 'English or Bangla is required');

const schema = z.object({
  title: localizedSchema,
  subtitle: z.object({ en: z.string().optional(), bn: z.string().optional() }),
  shortDescription: z.object({ en: z.string().optional(), bn: z.string().optional() }),
  content: localizedSchema,
  status: z.enum(['Draft', 'Pending', 'Scheduled', 'Published', 'Archived']),
  publishDate: z.string().optional(),
  scheduledPublishDate: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  language: z.enum(['en', 'bn', 'both']),
  thumbnailImage: z.string().optional().nullable(),
  imageGallery: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  categories: z.array(z.string()).optional()
});

const defaults = {
  title: emptyLocalized(),
  subtitle: emptyLocalized(),
  shortDescription: emptyLocalized(),
  content: emptyLocalized(),
  status: 'Draft',
  publishDate: '',
  scheduledPublishDate: '',
  seoTitle: '',
  seoDescription: '',
  language: 'both',
  thumbnailImage: null,
  imageGallery: [],
  videoUrl: '',
  categories: []
};

function normalizeLocalized(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function normalizeNews(value) {
  return {
    ...defaults,
    ...value,
    title: normalizeLocalized(value?.title),
    subtitle: normalizeLocalized(value?.subtitle),
    shortDescription: normalizeLocalized(value?.shortDescription),
    content: normalizeLocalized(value?.content),
    thumbnailImage: mediaId(value?.thumbnailImage) || null,
    imageGallery: Array.isArray(value?.imageGallery) ? value.imageGallery.map(mediaId).filter(Boolean) : [],
    videoUrl: value?.videoUrl || '',
    publishDate: toLocalDatetime(value?.publishDate || value?.scheduledPublishDate),
    scheduledPublishDate: toLocalDatetime(value?.scheduledPublishDate),
    categories: Array.isArray(value?.categories) ? value.categories.map(c => c._id || c) : []
  };
}

function toLocalDatetime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function NewsEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeLang, setActiveLang] = useState('bn');
  const [featuredMode, setFeaturedMode] = useState('image');
  const [initialMedia, setInitialMedia] = useState({ thumbnailImage: null, imageGallery: [] });
  const [previewUrl, setPreviewUrl] = useState('');
  const [shortlink, setShortlink] = useState('');
  const { data: categories } = useApiResource('/categories', { type: 'news', limit: 1000 });
  const { register, handleSubmit, control, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: defaults });
  const [saved, withSaveState] = useSaveState();

  useEffect(() => {
    if (id) {
      api.get(`/news/${id}`).then((response) => {
        const news = response.data.data;
        setInitialMedia({
          thumbnailImage: news.thumbnailImage || null,
          imageGallery: Array.isArray(news.imageGallery) ? news.imageGallery : []
        });
        setFeaturedMode(news.videoUrl ? 'video' : 'image');
        setPreviewUrl(newsPreviewUrl(news));
        setShortlink(shortlinkUrl(news));
        reset(normalizeNews(news));
      });
    } else {
      setInitialMedia({ thumbnailImage: null, imageGallery: [] });
      setFeaturedMode('image');
      setPreviewUrl('');
      setShortlink('');
      reset(defaults);
    }
  }, [id, reset]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const values = watch();
      if ((values.title?.en || values.title?.bn) && !id) localStorage.setItem('autosave-news-draft', JSON.stringify(values));
    }, 1500);
    return () => clearTimeout(timer);
  }, [watch(), id]);

  async function onSubmit(values) {
    const publishDate = values.publishDate ? new Date(values.publishDate).toISOString() : undefined;
    const payload = {
      ...values,
      publishDate,
      scheduledPublishDate: values.status === 'Scheduled' ? publishDate : undefined,
      videoUrl: values.videoUrl?.trim() || '',
      thumbnailImage: values.videoUrl?.trim() ? null : values.thumbnailImage
    };
    const response = id ? await api.put(`/news/${id}`, payload) : await api.post('/news', payload);
    setPreviewUrl(newsPreviewUrl(response.data.data));
    setShortlink(shortlinkUrl(response.data.data));
    dispatch(showToast(id ? 'News updated' : 'News created'));
    navigate('/news');
  }

  async function copyShortlink() {
    if (!shortlink) return;
    await copyText(shortlink);
    dispatch(showToast('Shortlink copied'));
  }

  function onError() {
    dispatch(showToast('Please fill out all mandatory fields.'));
  }

  const videoUrl = watch('videoUrl');
  const videoEmbedUrl = youtubeEmbedUrl(videoUrl);
  const selectedCategories = watch('categories') || [];

  function toggleCategory(categoryId) {
    const next = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setValue('categories', next, { shouldDirty: true, shouldValidate: true });
  }

  return (
    <>
      <PageHeader title={id ? 'Edit News' : 'Create News'} description="Manage story content, publishing workflow, SEO, protection, and print output." actions={id ? <Link to="/news/create"><Button><Plus size={16} /> Add New News</Button></Link> : null} />
      <form onSubmit={handleSubmit(withSaveState(onSubmit), onError)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2 font-semibold"><Languages size={18} /> Article language content</div>
            <div className="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
              {[
                ['bn', 'বাংলা'],
                ['en', 'English']
              ].map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold ${activeLang === code ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
                  onClick={() => setActiveLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4" dir={activeLang === 'bn' ? 'ltr' : 'ltr'}>
            <FormField label={activeLang === 'bn' ? 'Title Bangla' : 'Title English'} error={errors.title?.message}>
              <input key={`title-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`title.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Subtitle Bangla' : 'Subtitle English'}>
              <input key={`subtitle-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`subtitle.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Short description Bangla' : 'Short description English'}>
              <textarea key={`shortDescription-${activeLang}`} dir={activeLang === 'bn' ? 'auto' : 'ltr'} lang={activeLang} rows="3" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`shortDescription.${activeLang}`)} />
            </FormField>
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
          {shortlink && (
            <Card className="p-5">
              <h2 className="mb-3 font-semibold">Shortlink</h2>
              <div className="space-y-3">
                <input readOnly value={shortlink} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
                <Button type="button" variant="secondary" className="w-full" onClick={copyShortlink}><Copy size={16} /> Copy shortlink</Button>
              </div>
            </Card>
          )}
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
          <Card className="p-5">
            <div className="space-y-4">
              <FormField label="Status"><select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('status')}><option>Draft</option><option>Pending</option><option>Scheduled</option><option>Published</option><option>Archived</option></select></FormField>
              <FormField label="Publish date & time">
                <input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('publishDate')} />
                <p className="mt-1 text-xs text-slate-500">For Scheduled status, this is the automatic publish time.</p>
              </FormField>
              <FormField label="Publishing language">
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('language')}>
                  <option value="both">Bangla + English</option>
                  <option value="en">English only</option>
                  <option value="bn">Bangla only</option>
                </select>
              </FormField>
              <FormField label="Categories">
                <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3 dark:border-slate-700 dark:bg-slate-950">
                  {categories?.length ? categories.map((category) => (
                    <label key={category._id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => toggleCategory(category._id)}
                      />
                      <span>{category.name || category.nameBn}</span>
                    </label>
                  )) : (
                    <p className="text-sm text-slate-500">No categories found.</p>
                  )}
                </div>
              </FormField>
              <Button className="w-full" loading={isSubmitting} saved={saved}><Save size={16} /> Save News</Button>
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
