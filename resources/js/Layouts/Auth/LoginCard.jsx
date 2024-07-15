import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
    Typography,
    Input,
    Checkbox,
    Button,
} from '@material-tailwind/react';

export function LoginCard({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div>
            <Typography variant="h3" color="gray" className="text-center mb-6">
                Sign In
            </Typography>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div className="mb-4">
                    <Input
                        label="Email"
                        size="lg"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email ? true : false}
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
                    />
                    {errors.password && (
                        <Typography variant="small" color="red">
                            {errors.password}
                        </Typography>
                    )}
                </div>
                <div className="-ml-2.5 mb-4">
                    <Checkbox
                        label="Remember Me"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                </div>
                <div className="flex items-center justify-end mb-4">
                    <Button variant="gradient" fullWidth type="submit" disabled={processing} className="ml-4">
                        Sign In
                    </Button>
                </div>
            </form>
            <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                >
                    <a href={route(('register'))}>Sign up</a>
                </Typography>
            </Typography>
            <Typography variant="small" className="mt-1 flex justify-center">
                <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1"
                >

                    {canResetPassword && (
                        <a
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </a>
                    )}
                </Typography>
            </Typography>
        </div>
    );
}
