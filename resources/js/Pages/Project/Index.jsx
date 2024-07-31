import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
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
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import Create from './Create';
import UpdateProject from './UpdateProject';

const TABS = [
    { label: "All", value: "all" },
    { label: "Archive", value: "archive" },
];

const TABLE_HEAD = ["Project Name", "Description", "Adresse", "Surface", "Documents", "Actions"];
const ARCHIVE_TABLE_HEAD = ["Project Name", "Description", "Adresse", "Surface", "Documents", "Actions"];

export default function Index({ auth, blocs, projets, archivedProjets }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [tableRows, setTableRows] = useState(projets);
    const [archiveRows, setArchiveRows] = useState(archivedProjets);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openUpdateModal = (project) => {
        setSelectedProject(project);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => setIsUpdateModalOpen(false);

    const handleAddProject = (project) => {
        setTableRows((prevRows) => [...prevRows, project]);
        closeCreateModal();
    };

    const handleUpdateProject = (updatedProject) => {
        setTableRows((prevRows) =>
            prevRows.map((project) =>
                project.idProjet === updatedProject.idProjet ? updatedProject : project
            )
        );
        closeUpdateModal();
    };

    const handleArchiveProject = (projectId) => {
        const projectToArchive = tableRows.find((project) => project.idProjet === projectId);
    
        if (!projectToArchive) {
            console.error('Project not found for archiving');
            return;
        }
    
        Inertia.put(`/projects/archive/${projectId}`, {}, {
            onSuccess: (response) => {
                if (response.props.message === 'Project archived successfully') {
                    setTableRows((prevRows) => prevRows.filter((project) => project.idProjet !== projectId));
                    setArchiveRows((prevRows) => [...prevRows, { ...projectToArchive, archived: true }]);
                } else {
                    console.error('Failed to archive project');
                }
            },
            onError: (error) => {
                console.error('Archive error:', error);
            }
        });
    };

    const handleUnarchiveProject = (projectId) => {
        const projectToUnarchive = archiveRows.find((project) => project.idProjet === projectId);
    
        if (!projectToUnarchive) {
            console.error('Project not found for unarchiving');
            return;
        }
    
        Inertia.put(`/projects/unarchive/${projectId}`, {}, {
            onSuccess: (response) => {
                if (response.props.message === 'Project unarchived successfully') {
                    setArchiveRows((prevRows) => prevRows.filter((project) => project.idProjet !== projectId));
                    setTableRows((prevRows) => [...prevRows, { ...projectToUnarchive, archived: false }]);
                } else {
                    console.error('Failed to unarchive project');
                }
            },
            onError: (error) => {
                console.error('Unarchive error:', error);
            }
        });
    };

    const renderTableRows = (rows, isArchiveTab) => {
        return rows.map(({ idProjet, nomProjet, description, adresse, superficieTotale, documents }, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
                <tr key={idProjet}>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {nomProjet}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {description}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {adresse}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {superficieTotale}
                        </Typography>
                    </td>
                    <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {documents}
                        </Typography>
                    </td>
                    <td className={classes}>
                        {!isArchiveTab && (
                            <>
                                <Tooltip content="Edit Project">
                                    <IconButton
                                        variant="text"
                                        onClick={() => openUpdateModal({ idProjet, nomProjet, description, adresse, superficieTotale, documents })}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip content="Archive Project">
                                    <IconButton
                                        variant="text"
                                        onClick={() => handleArchiveProject(idProjet)}
                                    >
                                        <ArchiveBoxXMarkIcon className="h-5 w-5" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                        {isArchiveTab && (
                            <Tooltip content="Unarchive Project">
                                <IconButton
                                    variant="text"
                                    onClick={() => handleUnarchiveProject(idProjet)}
                                >
                                    <ArchiveBoxXMarkIcon className="h-5 w-5" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </td>
                </tr>
            );
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="px-10 mt-12">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Project List
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    See information about all projects
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button variant="outlined" size="sm">
                                    View all
                                </Button>
                                <Button className="flex items-center gap-3" size="sm" onClick={openCreateModal}>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4 text-white" /> Add Project
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} className="w-full md:w-max">
                                <TabsHeader>
                                    {TABS.map(({ label, value }) => (
                                        <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
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
                                    {(activeTab === 'all' ? TABLE_HEAD : ARCHIVE_TABLE_HEAD).map((head, index) => (
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
                                {activeTab === 'all' ? renderTableRows(tableRows, false) : renderTableRows(archiveRows, true)}
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
                            <Create closeModal={closeCreateModal} onAddProject={handleAddProject} />
                        </div>
                    </div>
                )}
                {/* Update Modal Component */}
                {isUpdateModalOpen && selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
                            <UpdateProject closeModal={closeUpdateModal} onUpdateProject={handleUpdateProject} projectData={selectedProject} />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
