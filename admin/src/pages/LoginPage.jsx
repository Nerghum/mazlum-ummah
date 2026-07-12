import { zodResolver } from '@hookform/resolvers/zod';
import { Newspaper } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/Button.jsx';
import { FormField } from '../components/FormField.jsx';
import { api } from '../services/api.js';
import { setCredentials } from '../store/authSlice.js';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({ resolver: zodResolver(schema), defaultValues: { email: 'superadmin@news.local', password: 'Admin123!' } });

  async function onSubmit(values) {
    try {
      const response = await api.post('/auth/login', values);
      dispatch(setCredentials(response.data.data));
      navigate('/dashboard');
    } catch (error) {
      setError('root', { message: error.response?.data?.message || 'Login failed' });
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 dark:bg-slate-950">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white"><Newspaper /></div>
          <div>
            <h1 className="text-xl font-bold">Newsroom CMS</h1>
            <p className="text-sm text-slate-500">Secure admin sign in</p>
          </div>
        </div>
        <div className="space-y-4">
          <FormField label="Email" error={errors.email?.message}>
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('email')} />
          </FormField>
          <FormField label="Password" error={errors.password?.message}>
            <input type="password" className="w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" {...register('password')} />
          </FormField>
          {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
          <Button className="w-full" disabled={isSubmitting}>Login</Button>
          <Link className="block text-center text-sm text-brand-600" to="/forgot-password">Forgot password?</Link>
        </div>
      </form>
    </main>
  );
}
