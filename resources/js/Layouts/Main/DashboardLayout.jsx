import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from '@material-tailwind/react';
import BarChart from '@/Components/Charts/BarChart';
import CardUi from '@/Components/Cards/CardUi';
import { SortableTable } from '@/Components/Tables/Sortable_Table';
import { TableStripedRows } from '@/Components/Tables/Table_Striped';

export default function DashboardLayout({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex mt-12 space-x-4">
                        <div className="flex-1"><CardUi /></div>
                        <div className="flex-1"><CardUi /></div>
                        <div className="flex-1"><CardUi /></div>
                        <div className="flex-1"><CardUi /></div>
                    </div>
                    <div className="flex mt-12 space-x-4">
                        <div className="flex-1"><BarChart /></div>
                        <div className="flex-1"><BarChart /></div>
                        <div className="flex-1"><BarChart /></div>
                    </div>
                    <div className="flex mt-12 space-x-4">
                        <div className="flex-1"><SortableTable /></div>
                        <div className="flex-2"><TableStripedRows /></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
