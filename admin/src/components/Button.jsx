import { Check, LoaderCircle } from 'lucide-react';
import { classNames } from '../utils/format.js';

export function Button({ children, variant = 'primary', className = '', loading = false, loadingText = 'Saving...', saved = false, disabled, ...props }) {
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const activeVariant = saved ? 'bg-emerald-600 text-white hover:bg-emerald-700' : (loading ? 'bg-slate-400 text-white cursor-not-allowed' : variants[variant]);

  return (
    <button
      className={classNames('inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed', activeVariant, className)}
      disabled={disabled || loading || saved}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          {loadingText}
        </>
      ) : saved ? (
        <>
          <Check size={16} />
          Saved!
        </>
      ) : children}
    </button>
  );
}
