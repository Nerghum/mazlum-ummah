import { Skeleton } from './Skeleton.jsx';
import { localizedValue } from '../utils/localized.js';

function renderCell(value) {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return localizedValue(value, 'en') || localizedValue(value, 'bn') || JSON.stringify(value);
  return value;
}

export function DataTable({ columns, rows, loading, selected = [], onSelect, rowKey = '_id' }) {
  if (loading) return <Skeleton rows={6} />;
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/60">
            <tr>
              {onSelect && <th className="w-10 px-4 py-3" />}
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row[rowKey]} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                {onSelect && (
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(row[rowKey])} onChange={() => onSelect(row[rowKey])} />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 align-top">{column.render ? column.render(row) : renderCell(row[column.key])}</td>
                ))}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={columns.length + (onSelect ? 1 : 0)} className="px-4 py-12 text-center text-slate-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
