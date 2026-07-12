import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button.jsx';
import { Card } from '../components/Card.jsx';
import { DataTable } from '../components/DataTable.jsx';
import { FormField } from '../components/FormField.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useApiResource } from '../hooks/useApiResource.js';
import { api } from '../services/api.js';

export function CountriesPage() {
  const { data, loading, reload } = useApiResource('/countries');
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: '', code: '', flag: '', sortOrder: 0 } });
  async function save(values) {
    await api.post('/countries', { ...values, sortOrder: Number(values.sortOrder) });
    reset();
    reload();
  }
  return (
    <>
      <PageHeader title="Countries" description="Country flags, filtering, multi-country publishing, and homepage sections." />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Card className="p-5">
          <form className="space-y-4" onSubmit={handleSubmit(save)}>
            <FormField label="Name"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('name')} /></FormField>
            <FormField label="Code"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('code')} /></FormField>
            <FormField label="Flag"><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('flag')} /></FormField>
            <FormField label="Sort order"><input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('sortOrder')} /></FormField>
            <Button><Plus size={16} /> Add country</Button>
          </form>
        </Card>
        <DataTable loading={loading} rows={data} columns={[{ key: 'flag', label: 'Flag' }, { key: 'name', label: 'Name' }, { key: 'code', label: 'Code' }, { key: 'slug', label: 'Slug' }]} />
      </div>
    </>
  );
}
