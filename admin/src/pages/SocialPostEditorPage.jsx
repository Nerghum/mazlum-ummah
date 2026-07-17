import { zodResolver } from '@hookform/resolvers/zod';
import { Play, Save, Plus } from 'lucide-react';
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
import { api } from '../services/api.js';
import { showToast } from '../store/uiSlice.js';
import { youtubeEmbedUrl } from '../utils/video.js';

const schema = z.object({
  postType: z.enum(['image', 'video']),
  authorName: z.string().optional(),
  authorAvatar: z.string().optional().nullable(),
  content: z.string().min(1, 'Content is required'),
  hashtagsText: z.string().optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  videoThumbnail: z.string().optional().nullable(),
  publishDate: z.string().optional(),
  status: z.enum(['Draft', 'Pending', 'Scheduled', 'Published', 'Archived']),
  sortOrder: z.coerce.number().optional()
});

const defaults = {
  postType: 'image',
  authorName: 'Mazlum Ummah-মজলুম উম্মাহ',
  authorAvatar: null,
  content: '',
  hashtagsText: '',
  images: [],
  videoUrl: '',
  videoThumbnail: null,
  publishDate: '',
  status: 'Draft',
  sortOrder: 0
};

function toLocalDatetime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function normalizePost(value) {
  return {
    ...defaults,
    ...value,
    authorAvatar: mediaId(value?.authorAvatar) || null,
    images: Array.isArray(value?.images) ? value.images.map(mediaId).filter(Boolean) : [],
    videoThumbnail: mediaId(value?.videoThumbnail) || null,
    hashtagsText: (value?.hashtags || []).join(' '),
    publishDate: toLocalDatetime(value?.publishDate),
    videoUrl: value?.videoUrl || ''
  };
}

function splitHashtags(value = '') {
  return value
    .split(/[\s,]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));
}

export function SocialPostEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialMedia, setInitialMedia] = useState({ authorAvatar: null, images: [], videoThumbnail: null });
  const { register, handleSubmit, control, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: defaults });

  useEffect(() => {
    if (id) {
      api.get(`/social-posts/${id}`).then((response) => {
        const item = response.data.data;
        setInitialMedia({
          authorAvatar: item.authorAvatar || null,
          images: Array.isArray(item.images) ? item.images : [],
          videoThumbnail: item.videoThumbnail || null
        });
        reset(normalizePost(item));
      });
    } else {
      setInitialMedia({ authorAvatar: null, images: [], videoThumbnail: null });
      reset(defaults);
    }
  }, [id, reset]);

  async function onSubmit(values) {
    const publishDate = values.publishDate ? new Date(values.publishDate).toISOString() : '';
    const payload = {
      postType: values.postType,
      authorName: values.authorName?.trim() || defaults.authorName,
      authorAvatar: values.authorAvatar || null,
      content: values.content,
      hashtags: splitHashtags(values.hashtagsText),
      images: values.postType === 'image' ? values.images || [] : [],
      videoUrl: values.postType === 'video' ? values.videoUrl?.trim() || '' : '',
      videoThumbnail: values.postType === 'video' ? values.videoThumbnail || null : null,
      publishDate,
      status: values.status,
      sortOrder: Number(values.sortOrder || 0)
    };
    const response = id ? await api.put(`/social-posts/${id}`, payload) : await api.post('/social-posts', payload);
    dispatch(showToast(id ? 'Social post updated' : 'Social post created'));
    navigate('/social-posts');
  }

  function onError() {
    dispatch(showToast('Please fill out all mandatory fields.'));
  }

  const postType = watch('postType');
  const videoUrl = watch('videoUrl');
  const videoEmbedUrl = youtubeEmbedUrl(videoUrl);

  return (
    <>
      <PageHeader title={id ? 'Edit Social Post' : 'Create Social Post'} description="Add one-language image or video posts for the social feed page." actions={id ? <Link to="/social-posts/create"><Button><Plus size={16} /> Add New</Button></Link> : null} />
      <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="grid gap-4">
            <FormField label="Post content" error={errors.content?.message}>
              <textarea rows="7" dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('content')} />
            </FormField>
            <FormField label="Hashtags">
              <input dir="auto" placeholder="#মজলুম_উম্মাহ #MazlumUmmah" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('hashtagsText')} />
            </FormField>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Author name">
                <input dir="auto" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('authorName')} />
              </FormField>
              <FormField label="Sort order">
                <input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('sortOrder')} />
              </FormField>
            </div>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <div className="space-y-4">
              <FormField label="Post type">
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                  {...register('postType')}
                  onChange={(event) => {
                    setValue('postType', event.target.value);
                    if (event.target.value === 'image') {
                      setValue('videoUrl', '');
                      setValue('videoThumbnail', null);
                    } else {
                      setValue('images', []);
                    }
                  }}
                >
                  <option value="image">Image post</option>
                  <option value="video">YouTube video post</option>
                </select>
              </FormField>
              <FormField label="Status">
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('status')}>
                  <option>Draft</option><option>Pending</option><option>Published</option><option>Archived</option>
                </select>
              </FormField>
              <FormField label="Publish date">
                <input type="datetime-local" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('publishDate')} />
              </FormField>

              <Button className="w-full" loading={isSubmitting}><Save size={16} /> Save Social Post</Button>
            </div>
          </Card>

          <Card className="p-5">
            <Controller
              name="authorAvatar"
              control={control}
              render={({ field }) => (
                <MediaImageField label="Author avatar" value={field.value} initialItems={initialMedia.authorAvatar} onChange={field.onChange} />
              )}
            />
          </Card>

          {postType === 'image' ? (
            <Card className="p-5">
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <MediaImageField label="Post images" multiple value={field.value || []} initialItems={initialMedia.images} onChange={field.onChange} />
                )}
              />
            </Card>
          ) : (
            <>
              <Card className="p-5">
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
              </Card>
              <Card className="p-5">
                <Controller
                  name="videoThumbnail"
                  control={control}
                  render={({ field }) => (
                    <MediaImageField label="Custom video thumbnail" value={field.value} initialItems={initialMedia.videoThumbnail} onChange={field.onChange} />
                  )}
                />
              </Card>
            </>
          )}
        </div>
      </form>
    </>
  );
}
