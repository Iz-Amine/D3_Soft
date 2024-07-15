import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
  Typography,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

export function RegisterCard({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div>
      <Typography variant="h3" color="gray" className="text-center mb-6">
        Register
      </Typography>
      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
      <form onSubmit={submit}>
        <div className="mb-4">
          <Input
            label="Name"
            size="lg"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            error={errors.name ? true : false}
            required
          />
          {errors.name && (
            <Typography variant="small" color="red">
              {errors.name}
            </Typography>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Email"
            size="lg"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email ? true : false}
            required
          />
          {errors.email && (
            <Typography variant="small" color="red">
              {errors.email}
            </Typography>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            size="lg"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password ? true : false}
            required
          />
          {errors.password && (
            <Typography variant="small" color="red">
              {errors.password}
            </Typography>
          )}
        </div>
        <div className="mb-4">
          <Input
            label="Confirm Password"
            size="lg"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            error={errors.password_confirmation ? true : false}
            required
          />
          {errors.password_confirmation && (
            <Typography variant="small" color="red">
              {errors.password_confirmation}
            </Typography>
          )}
        </div>
        <div className="flex items-center justify-end mb-4">
          <Button variant="gradient" fullWidth type="submit" disabled={processing}>
            Register
          </Button>
        </div>
        <div className="flex items-center justify-end mb-4">
          <a
            href={route('login')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </a>
        </div>
      </form>
    </div>
  );
}
