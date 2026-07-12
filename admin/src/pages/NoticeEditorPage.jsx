import { zodResolver } from '@hookform/resolvers/zod';
import { ExternalLink, Languages, Save, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';
import { emptyLocalized } from '../utils/localized.js';
import { noticePreviewUrl } from '../utils/preview.js';

const localizedSchema = z.object({
  en: z.string().optional(),
  bn: z.string().optional()
}).refine((value) => (value.en || '').trim() || (value.bn || '').trim(), 'English or Bangla is required');

const schema = z.object({
  title: localizedSchema,
  summary: z.object({ en: z.string().optional(), bn: z.string().optional() }),
  content: localizedSchema,
  status: z.enum(['Draft', 'Published', 'Archived']),
  publishDate: z.string().optional(),
  expiresAt: z.string().optional(),
  priorityOrder: z.coerce.number()
});

const defaults = {
  title: emptyLocalized(),
  summary: emptyLocalized(),
  content: emptyLocalized(),
  status: 'Draft',
  publishDate: '',
  expiresAt: '',
  priorityOrder: 0
};

function normalizeLocalized(value) {
  if (typeof value === 'string') return { en: value, bn: '' };
  return { en: value?.en || '', bn: value?.bn || '' };
}

function toInputDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
}

function toIso(value) {
  return value ? new Date(value).toISOString() : '';
}

function normalizeNotice(value) {
  return {
    ...defaults,
    ...value,
    title: normalizeLocalized(value?.title),
    summary: normalizeLocalized(value?.summary),
    content: normalizeLocalized(value?.content),
    publishDate: toInputDateTime(value?.publishDate),
    expiresAt: toInputDateTime(value?.expiresAt)
  };
}

export function NoticeEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeLang, setActiveLang] = useState('bn');
  const [previewUrl, setPreviewUrl] = useState('');
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: defaults });

  useEffect(() => {
    if (id) {
      api.get(`/notices/${id}`).then((response) => {
        const notice = response.data.data;
        setPreviewUrl(noticePreviewUrl(notice));
        reset(normalizeNotice(notice));
      });
    } else {
      setPreviewUrl('');
      reset(defaults);
    }
  }, [id, reset]);

  async function onSubmit(values) {
    const payload = {
      ...values,
      publishDate: toIso(values.publishDate),
      expiresAt: toIso(values.expiresAt)
    };
    const response = id ? await api.put(`/notices/${id}`, payload) : await api.post('/notices', payload);
    const notice = response.data.data;
    setPreviewUrl(noticePreviewUrl(notice));
    dispatch(showToast(id ? 'Notice updated' : 'Notice created'));
    navigate('/notices');
  }

  function onError() {
    dispatch(showToast('Please fill out all mandatory fields.'));
  }

  return (
    <>
      <PageHeader title={id ? 'Edit Notice' : 'Create Notice'} description="Publish bilingual notices to the public notice page." actions={id ? <Link to="/notices/create"><Button><Plus size={16} /> Add New</Button></Link> : null} />
      <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2 font-semibold"><Languages size={18} /> Notice language content</div>
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
              <input dir="auto" lang={activeLang} className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`title.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Summary Bangla' : 'Summary English'}>
              <textarea dir="auto" lang={activeLang} rows="3" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register(`summary.${activeLang}`)} />
            </FormField>
            <FormField label={activeLang === 'bn' ? 'Content Bangla' : 'Content English'} error={errors.content?.message}>
              <textarea dir="auto" lang={activeLang} rows="12" className="w-full rounded-lg border border-slate-200 px-3 py-2 leading-7 dark:border-slate-700 dark:bg-slate-950" {...register(`content.${activeLang}`)} />
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
                  <Button type="button" variant="secondary" className="w-full"><ExternalLink size={16} /> Open notice page</Button>
                </a>
              </div>
            </Card>
          )}
          <Card className="sticky top-20 z-10 p-5">
            <div className="space-y-4">
              <FormField label="Status"><select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('status')}><option>Draft</option><option>Published</option><option>Archived</option></select></FormField>
              <FormField label="Publish date"><input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('publishDate')} /></FormField>
              <FormField label="Expires at"><input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('expiresAt')} /></FormField>
              <FormField label="Priority order"><input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('priorityOrder')} /></FormField>

              <Button className="w-full" loading={isSubmitting}><Save size={16} /> Save Notice</Button>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}
