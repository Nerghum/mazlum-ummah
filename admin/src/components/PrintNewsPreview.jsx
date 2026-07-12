import { Button } from './Button.jsx';
import { localizedValue } from '../utils/localized.js';

export function PrintNewsPreview({ news }) {
  const title = localizedValue(news.title, 'en') || localizedValue(news.title, 'bn') || 'Untitled news';
  const description = localizedValue(news.shortDescription, 'en') || localizedValue(news.shortDescription, 'bn');
  const content = localizedValue(news.content, 'en') || localizedValue(news.content, 'bn');

  return (
    <article className="print-surface rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="no-print mb-4 flex justify-end">
        <Button variant="secondary" onClick={() => window.print()}>Print / PDF</Button>
      </div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>
      <div className="mt-6 prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content || '' }} />
    </article>
  );
}
