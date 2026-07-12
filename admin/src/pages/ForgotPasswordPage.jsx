import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { FormField } from '../components/FormField.jsx';
import { api } from '../services/api.js';

const schema = z.object({ email: z.string().email() });

export function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm({ resolver: zodResolver(schema) });
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit((values) => api.post('/auth/forgot-password', values))} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="mb-2 text-xl font-bold">Reset password</h1>
        <p className="mb-6 text-sm text-slate-500">Enter your account email to generate reset instructions.</p>
        <FormField label="Email" error={errors.email?.message}>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('email')} />
        </FormField>
        {isSubmitSuccessful && <p className="mt-3 text-sm text-green-600">Reset request created. In development, the API returns a token.</p>}
        <Button className="mt-5 w-full">Send reset link</Button>
        <Link className="mt-4 block text-center text-sm text-brand-600" to="/login">Back to login</Link>
      </form>
    </main>
  );
}
