import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoginCard } from '@/Layouts/Auth/LoginCard';

export default function Login({ status, canResetPassword }) {
    return (
        <GuestLayout>
            <Head title="Log in" />
            <LoginCard status={status} canResetPassword={canResetPassword} />
        </GuestLayout>
    );
}