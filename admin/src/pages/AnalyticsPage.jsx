import {
  BarChart3,
  CalendarDays,
  Clock3,
  Eye,
  Globe2,
  Laptop,
  MapPin,
  MousePointerClick,
  Newspaper,
  Smartphone,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { api } from '../services/api.js';
import { formatDate } from '../utils/format.js';
import { localizedValue } from '../utils/localized.js';

function todayInput() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoInput(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

function number(value) {
  return Number(value || 0).toLocaleString();
}

function pageTitle(item) {
  return item?.title || item?.pageTitle || item?.path || '-';
}

function maxCount(items, key = 'views') {
  return Math.max(1, ...((items || []).map((item) => Number(item[key] || item.count || 0))));
}

function MiniBarChart({ items = [], labelKey = '_id', valueKey = 'views', color = 'bg-brand-500' }) {
  const max = maxCount(items, valueKey);
  return (
    <div className="flex h-64 items-end gap-2 overflow-x-auto pb-2">
      {items.length ? items.map((item) => {
        const value = Number(item[valueKey] || item.count || 0);
        const height = Math.max(10, Math.round((value / max) * 210));
        const label = String(item[labelKey] || item._id || '').slice(-5);
        return (
          <div key={`${label}-${value}`} className="flex min-w-10 flex-1 flex-col items-center gap-2">
            <div className={`w-full rounded-t ${color}`} style={{ height }} title={`${label}: ${value}`} />
            <span className="text-[10px] text-slate-500">{label}</span>
          </div>
        );
      }) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">No data yet</div>
      )}
    </div>
  );
}

function RankingTable({ items = [], columns = ['views', 'visitors'], empty = 'No data yet' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-500">
          <tr>
            <th className="py-2 pr-3">Page</th>
            {columns.includes('type') && <th className="px-3 py-2">Type</th>}
            {columns.includes('views') && <th className="px-3 py-2 text-right">Views</th>}
            {columns.includes('visitors') && <th className="px-3 py-2 text-right">Visitors</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.length ? items.map((item) => (
            <tr key={`${item.path}-${item.type || ''}`}>
              <td className="py-3 pr-3">
                <div className="font-semibold text-slate-900 dark:text-white">{pageTitle(item)}</div>
                <a href={item.path} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline">
                  {item.path}
                </a>
              </td>
              {columns.includes('type') && <td className="px-3 py-3 capitalize text-slate-500">{item.type || item.contentType || '-'}</td>}
              {columns.includes('views') && <td className="px-3 py-3 text-right font-semibold">{number(item.views)}</td>}
              {columns.includes('visitors') && <td className="px-3 py-3 text-right font-semibold">{number(item.visitors)}</td>}
            </tr>
          )) : (
            <tr>
              <td className="py-6 text-center text-slate-500" colSpan={4}>{empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function BreakdownList({ items = [], label = 'No data yet' }) {
  const max = maxCount(items, 'count');
  return (
    <div className="space-y-3">
      {items.length ? items.map((item) => {
        const width = `${Math.max(4, Math.round((Number(item.count || 0) / max) * 100))}%`;
        return (
          <div key={item._id || 'unknown'}>
            <div className="mb-1 flex items-center justify-between gap-3 text-sm">
              <span className="truncate">{item._id || 'Unknown'}</span>
              <span className="font-semibold">{number(item.count)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-brand-500" style={{ width }} />
            </div>
          </div>
        );
      }) : <p className="py-6 text-center text-sm text-slate-500">{label}</p>}
    </div>
  );
}

export function AnalyticsPage() {
  const [filters, setFilters] = useState({
    dateFrom: daysAgoInput(30),
    dateTo: todayInput(),
    day: todayInput(),
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadAnalytics(nextFilters = filters) {
    setLoading(true);
    const response = await api.get('/analytics/dashboard', { params: nextFilters });
    setData(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = data || {};
  const summary = stats.summary || {};
  const breakdowns = stats.breakdowns || {};
  const mostViewedNews = useMemo(() => stats.mostViewed || [], [stats.mostViewed]);

  const applyFilters = (event) => {
    event.preventDefault();
    loadAnalytics(filters);
  };

  return (
    <>
      <PageHeader title="Analytics" description="Visitor counter, page views, devices, locations, referrers, and post performance." />

      <Card className="mb-5 p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={applyFilters}>
          <label className="text-sm font-semibold">
            Date from
            <input type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.dateFrom} onChange={(event) => setFilters({ ...filters, dateFrom: event.target.value })} />
          </label>
          <label className="text-sm font-semibold">
            Date to
            <input type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.dateTo} onChange={(event) => setFilters({ ...filters, dateTo: event.target.value })} />
          </label>
          <label className="text-sm font-semibold">
            Most visited day
            <input type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={filters.day} onChange={(event) => setFilters({ ...filters, day: event.target.value })} />
          </label>
          <div className="flex items-end">
            <Button className="w-full" loading={loading} loadingText="Loading..."><CalendarDays size={16} /> Apply</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total visitors" value={summary.totalVisitors} icon={Users} />
        <StatCard label="Total page views" value={summary.totalViews} icon={Eye} />
        <StatCard label="Today visitors" value={summary.todayVisitors} icon={Clock3} />
        <StatCard label="This month visitors" value={summary.monthVisitors} icon={BarChart3} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today page views" value={summary.todayViews} icon={MousePointerClick} />
        <StatCard label="This month views" value={summary.monthViews} icon={CalendarDays} />
        <StatCard label="Published news" value={stats.publishedNews} icon={Newspaper} />
        <StatCard label="Trending news" value={stats.trendingNews} icon={Newspaper} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><BarChart3 size={18} /> Daily visitors and views</div>
          <MiniBarChart items={stats.dailyVisitors || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><CalendarDays size={18} /> Monthly visitors</div>
          <MiniBarChart items={stats.monthlyVisitors || []} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Eye size={18} /> Most visited pages</div>
          <RankingTable items={stats.mostVisitedPages || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Newspaper size={18} /> Most visited post pages</div>
          <RankingTable items={stats.mostVisitedPosts || []} columns={['type', 'views', 'visitors']} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><CalendarDays size={18} /> Most visited on selected day</div>
          <RankingTable items={stats.mostVisitedByDay || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Newspaper size={18} /> Most viewed news totals</div>
          <div className="space-y-3">
            {mostViewedNews.length ? mostViewedNews.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                <span className="truncate">{localizedValue(item.title, 'en') || localizedValue(item.title, 'bn')}</span>
                <span className="font-semibold">{number(item.views)}</span>
              </div>
            )) : <p className="py-6 text-center text-sm text-slate-500">No data yet</p>}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Smartphone size={18} /> Devices</div>
          <BreakdownList items={breakdowns.devices || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Laptop size={18} /> Browsers</div>
          <BreakdownList items={breakdowns.browsers || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Laptop size={18} /> Operating systems</div>
          <BreakdownList items={breakdowns.operatingSystems || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Globe2 size={18} /> Countries</div>
          <BreakdownList items={breakdowns.countries || []} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><MapPin size={18} /> Referrers</div>
          <BreakdownList items={breakdowns.referrers || []} />
        </Card>
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2 font-semibold"><Users size={18} /> Recent visitor details</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Time</th>
                  <th className="px-3 py-2">Visitor</th>
                  <th className="px-3 py-2">Page</th>
                  <th className="px-3 py-2">Device</th>
                  <th className="px-3 py-2">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(stats.recentVisitors || []).length ? stats.recentVisitors.map((visitor) => (
                  <tr key={`${visitor._id}-${visitor.createdAt}`}>
                    <td className="py-3 pr-3 whitespace-nowrap">{formatDate(visitor.createdAt)}</td>
                    <td className="px-3 py-3 font-mono text-xs">{visitor.visitor}</td>
                    <td className="px-3 py-3">
                      <div className="max-w-xs truncate font-semibold">{visitor.pageTitle || visitor.path}</div>
                      <div className="max-w-xs truncate text-xs text-slate-500">{visitor.path}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">{visitor.device || '-'} / {visitor.browser || '-'}</td>
                    <td className="px-3 py-3 whitespace-nowrap">{[visitor.city, visitor.region, visitor.country].filter(Boolean).join(', ') || 'Unknown'}</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="py-6 text-center text-slate-500" colSpan={5}>No visitor data yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
