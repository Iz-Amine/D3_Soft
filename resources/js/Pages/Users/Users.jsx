import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import CreateUser from '@/Components/DialogUser/CreateUser';
import UpdateUser from '@/Components/DialogUser/UpdateUser';

// const TABS = [
//     {
//         label: "All",
//         value: "all",
//     }
// ];

const TABLE_HEAD = [
    { label: "Membre", key: "name" },
    { label: "Rôle", key: "roles" },
    { label: "Téléphone", key: "telephone" },
    { label: "Adresse", key: "adresse" },
    { label: "CNI", key: "CNI" },
    { label: "Date de Naissance", key: "dateNaissance" },
    { label: "", key: "actions" }
];

export default function Users({ auth, users, roles }) {
    const [selectedUserIdDelete, setselectedUserIdDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState("");

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filterUsers = (users, searchQuery) => {
        return users.filter(user => {
            const query = searchQuery.toLowerCase();
            const fullName = `${user.fname} ${user.lname}`.toLowerCase();
            const userProps = [
                fullName,
                user.email.toLowerCase(),
                user.telephone ? user.telephone.toLowerCase() : "",
                user.adresse ? user.adresse.toLowerCase() : "",
                user.CNI ? user.CNI.toLowerCase() : "",
                user.dateNaissance ? user.dateNaissance.toLowerCase() : "",
                ...user.roles.map(role => role.name.toLowerCase())
            ];
            return userProps.some(prop => prop.includes(query));
        });
    };

    const filteredUsers = filterUsers(sortedUsers, searchQuery);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleDeleteClick = () => {
        if (selectedUserIdDelete) {
            Inertia.delete(route('user.destroy', selectedUserIdDelete), {
                onSuccess: () => {
                    console.log("User deleted successfully");
                },
                onError: (errors) => {
                    console.error('Error deleting user:', errors);
                }
            });
        }
    };

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        Liste des membres
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        Voir les informations sur tous les membres
                                    </Typography>
                                </div>
                                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                    <Button variant="outlined" size="sm">
                                        Voir tout
                                    </Button>
                                    <CreateUser roles={roles} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                {/* <Tabs value="all" className="w-full md:w-max">
                                    <TabsHeader>
                                        {TABS.map(({ label, value }) => (
                                            <Tab key={value} value={value}>
                                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs> */}
                                <div className="flex items-center gap-2">
                                    <Typography variant="small" color="blue-gray">
                                        Éléments par page :
                                    </Typography>
                                    <select
                                        className="border rounded-md w-15 h-9"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1); // Reset to first page when items per page changes
                                        }}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={30}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>

                                <div className="w-full md:w-72">
                                    <Input
                                        label="Recherche"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map(({ label, key }) => (
                                            <th
                                                key={key}
                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 cursor-pointer"
                                                onClick={() => handleSort(key)}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {label}
                                                    {sortConfig.key === key ? (
                                                        sortConfig.direction === 'asc' ? ' 🔽' : ' 🔼'
                                                    ) : null}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user, index) => {
                                        const isLast = index === paginatedUsers.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        const roleNames = user.roles.map(role => role.name).join(', ');

                                        return (
                                            <tr key={user.id}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {user.fname + " " + user.lname}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {user.email}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {roleNames}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {user.telephone || "N/A"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {user.adresse || "N/A"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {user.CNI || "N/A"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {user.dateNaissance || "N/A"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <UpdateUser roles={roles} user={user} />
                                                    <Tooltip content="Supprimer l'utilisateur">
                                                        <IconButton
                                                            className='bg-black text-white hover:bg-black'
                                                            variant="text"
                                                            onClick={() => setselectedUserIdDelete(user.id)}
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
                            <Typography variant="small" color="blue-gray">
                                <span className="font-semibold">{filteredUsers.length}</span> ligne
                            </Typography>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {currentPage} sur {totalPages}
                            </Typography>
                            <div className="flex gap-2">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </CardFooter>

                    </Card>
                </div>
            </div>

            {/* Confirm Delete Dialog */}
            {selectedUserIdDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
                        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                        <div className="flex justify-end mt-4">
                            <Button color="gray" onClick={() => setselectedUserIdDelete(null)}>
                                Annuler
                            </Button>
                            <Button color="red" onClick={handleDeleteClick} className="ml-2">
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
