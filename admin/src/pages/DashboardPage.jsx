import { FileText, Flame, Send, TrendingUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { Card } from '../components/Card.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { localizedValue } from '../utils/localized.js';

export function DashboardPage() {
  const { data, loading } = useApiResource('/analytics/dashboard');
  const stats = loading ? {} : data;
  return (
    <>
      <PageHeader title="Dashboard" description="Live editorial health, publishing status, and readership analytics." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total news" value={stats.totalNews} icon={FileText} />
        <StatCard label="Published" value={stats.publishedNews} icon={Send} />
        <StatCard label="Drafts" value={stats.draftNews} icon={FileText} />
        <StatCard label="Trending" value={stats.trendingNews} icon={Flame} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><TrendingUp size={18} /> Most viewed</div>
          <div className="space-y-3">
            {(stats.mostViewed || []).map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                <span>{localizedValue(item.title, 'en') || localizedValue(item.title, 'bn')}</span><span className="font-semibold">{item.views}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 font-semibold">Daily views</div>
          <div className="flex h-56 items-end gap-2">
            {(stats.dailyViews || []).slice(-14).map((item) => (
              <div key={`${item._id.day}-${item._id.event}`} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t bg-brand-500" style={{ height: `${Math.min(item.count * 12, 190)}px` }} />
                <span className="text-[10px] text-slate-500">{item._id.day.slice(5)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
