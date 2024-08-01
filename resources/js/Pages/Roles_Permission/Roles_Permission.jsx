import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import UpdateRole from '@/Components/DialogRole/UpdateRole';
import { Inertia } from "@inertiajs/inertia";
import CreateRole from '@/Components/DialogRole/CreateRole';

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Admin",
        value: "Admin",
    },
    {
        label: "User",
        value: "User",
    },
];

const TABLE_HEAD = ["Role", "Nombre of users", "Nombre of permissions", ""];


export default function Roles_Permission({ auth, roles, permissions }) {
    const [open, setOpen] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [selectedRoleIdDelete, setSelectedRoleIdDelete] = useState(null);

    const handleEditClick = (roleId) => {
        setSelectedRoleId(roleId);
        setOpen(true);  // Open the dialog when an edit button is clicked
    };

    const handleDelete = (roleId) => {
        setSelectedRoleIdDelete(roleId);
    };

    const handleDeleteClick = () => {
        if (true) {
            Inertia.delete(route('role.destroy', selectedRoleIdDelete), {
                onSuccess: () => {
                    console.log("Role deleted successfully");
                },
                onError: (errors) => {
                    console.error('Error deleting role:', errors);
                }
            });
        }
    };

    console.log(roles);
    console.log(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Roles_Permission</h2>}
        >
            <Head title="Roles && Permission" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        Members list
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        See information about all members
                                    </Typography>
                                </div>
                                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                    <Button variant="outlined" size="sm">
                                        view all
                                    </Button>
                                    <CreateRole permissions={permissions} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                <Tabs value="all" className="w-full md:w-max">
                                    <TabsHeader>
                                        {TABS.map(({ label, value }) => (
                                            <Tab key={value} value={value}>
                                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs>
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role, index) => {
                                        const isLast = index === roles.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={role.id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {role.name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {/* Placeholder for number of users */}
                                                        0
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {role.permissions_count}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Edit Role">
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() => handleEditClick(role.id)}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Role">
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() => handleDelete(role.id)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page 1 of 10
                            </Typography>
                            <div className="flex gap-2">
                                <Button variant="outlined" size="sm">
                                    Previous
                                </Button>
                                <Button variant="outlined" size="sm">
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* UpdateRole dialog */}
            {selectedRoleId && (
                <UpdateRole
                    roleId={selectedRoleId}
                    permissions={permissions}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}

            {/* Confirm Delete Dialog */}
            {selectedRoleIdDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold">Confirm Delete</h3>
                        <p>Are you sure you want to delete this role?</p>
                        <div className="flex justify-end mt-4">
                            <Button color="gray" onClick={() => setSelectedRoleIdDelete(null)}>
                                Cancel
                            </Button>
                            <Button color="red" onClick={handleDeleteClick} className="ml-2">
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}