import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Typography, Button, Card, CardHeader, CardBody, CardFooter, Input, IconButton, Tooltip } from "@material-tailwind/react";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Create from './Create';  // Ensure correct path

const TABLE_HEAD = ["Bloc Name", "Description", "Floors", "Apartments", "Surface", "Actions"];

export default function Index({ auth, blocs, projets }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBloc, setSelectedBloc] = useState(null);
    const [tableRows, setTableRows] = useState(blocs);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openUpdateModal = (bloc) => {
        setSelectedBloc(bloc);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const handleAddBloc = (bloc) => {
        setTableRows((prevRows) => [...prevRows, bloc]);
        closeCreateModal();
    };

    const handleUpdateBloc = (updatedBloc) => {
        setTableRows((prevRows) =>
            prevRows.map((bloc) =>
                bloc.id === updatedBloc.id ? updatedBloc : bloc
            )
        );
        closeUpdateModal();
    };

    const handleDeleteBloc = (blocId) => {
        Inertia.delete(`/blocs/destroy/${blocId}`, {
            onSuccess: () => {
                setTableRows((prevRows) => prevRows.filter((bloc) => bloc.id !== blocId));
            },
            onError: (error) => {
                console.error('Delete error:', error);
            }
        });
    };

    const renderTableRows = (rows) => {
        return rows.map(({ id, nomBloc, description, nombreEtages, nombreAppartements, superficieTotale }, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
                <tr key={id}>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {nomBloc}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {description}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {nombreEtages}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {nombreAppartements}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {superficieTotale}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Tooltip content="Edit Bloc">
                            <IconButton
                                variant="text"
                                onClick={() => openUpdateModal({ id, nomBloc, description, nombreEtages, nombreAppartements, superficieTotale })}
                            >
                                <PencilIcon className="h-5 w-5" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Bloc">
                            <IconButton
                                variant="text"
                                onClick={() => handleDeleteBloc(id)}
                            >
                                <TrashIcon className="h-5 w-5" />
                            </IconButton>
                        </Tooltip>
                    </td>
                </tr>
            );
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Blocs</h2>}
        >
            <Head title="Blocs" />

            <div className="px-10 mt-12">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Bloc List
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    See information about all blocs
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button variant="outlined" size="sm">
                                    View all
                                </Button>
                                <Button className="flex items-center gap-3" size="sm" onClick={openCreateModal}>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4 text-white" /> Add Bloc
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                {head}{" "}
                                                {index !== TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                )}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRows(tableRows)}
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
                {/* Create Modal Component */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
                            <Create closeModal={closeCreateModal} onAddBloc={handleAddBloc} projets={projets} />
                        </div>
                    </div>
                )}
                {/* Update Modal Component */}
                {isUpdateModalOpen && selectedBloc && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
                            <UpdateBloc closeModal={closeUpdateModal} onUpdateBloc={handleUpdateBloc} blocData={selectedBloc} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
