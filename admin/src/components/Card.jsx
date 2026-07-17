export function Card({ children, className = '' }) {
  return <div className={`min-w-0 rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900 ${className}`}>{children}</div>;
}
