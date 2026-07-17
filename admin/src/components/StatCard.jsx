export function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        {Icon && <Icon size={18} className="text-brand-600" />}
      </div>
      <div className="mt-3 text-3xl font-bold truncate">{value ?? 0}</div>
    </div>
  );
}
