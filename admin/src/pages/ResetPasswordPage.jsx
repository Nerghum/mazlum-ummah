import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { FormField } from '../components/FormField.jsx';
import { api } from '../services/api.js';

const schema = z.object({ token: z.string().min(20), password: z.string().min(8) });

export function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm({ resolver: zodResolver(schema) });
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit((values) => api.post('/auth/reset-password', values))} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-6 text-xl font-bold">Set new password</h1>
        <div className="space-y-4">
          <FormField label="Reset token" error={errors.token?.message}><input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('token')} /></FormField>
          <FormField label="New password" error={errors.password?.message}><input type="password" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('password')} /></FormField>
          {isSubmitSuccessful && <p className="text-sm text-green-600">Password updated.</p>}
          <Button className="w-full">Reset password</Button>
          <Link className="block text-center text-sm text-brand-600" to="/login">Back to login</Link>
        </div>
      </form>
    </main>
  );
}
