import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { SortableTable } from '@/Components/Tables/Sortable_Table';


export default function Roles_Permission({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Roles_Permission</h2>}
        >
            <Head title="Roles && Permission" />
            <div className="px-10 mt-12">
                <SortableTable
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Role & Permission list</h2>}
                    action= {<h2>add Role</h2>}

                />
            </div>
        </AuthenticatedLayout>
    );
}