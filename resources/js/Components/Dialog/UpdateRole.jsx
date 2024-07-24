import React, { useState, useEffect } from "react";
import {
    Card,
    Input,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Checkbox,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Inertia } from "@inertiajs/inertia";

const TABLE_HEAD1 = ["Model", "Permission", "Count", ""];

export default function UpdateRole({ roleId, open, setOpen, permissions }) {
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [groupedPermissions, setGroupedPermissions] = useState({});
    const [rolePermissions, setRolePermissions] = useState({});

    useEffect(() => {
        if (roleId) {
            fetch(`/role/${roleId}`)
                .then(response => response.json())
                .then(data => {
                    const { role } = data;

                    setRoleName(role.name);

                    // Group role permissions by Model_group and count permissions for each group
                    const groupedRolePermissions = role.permissions.reduce((acc, perm) => {
                        if (typeof perm === 'object' && perm.name) {
                            const group = perm.Model_group;
                            if (!acc[group]) {
                                acc[group] = { permissions: [], count: 0 };
                            }
                            acc[group].permissions.push(perm.name);
                            acc[group].count = acc[group].permissions.length;
                        }
                        return acc;
                    }, {});
                    setRolePermissions(groupedRolePermissions);
                })
                .catch(error => {
                    console.error('Error fetching role data:', error);
                });
        }
    }, [roleId]);

    useEffect(() => {
        if (permissions) {
            const permissionsArray = Object.values(permissions).flat();
            const grouped = permissionsArray.reduce((acc, { name, Model_group }) => {
                if (!acc[Model_group]) {
                    acc[Model_group] = { names: [], count: 0 };
                }
                acc[Model_group].names.push(name);
                acc[Model_group].count = acc[Model_group].names.length;
                return acc;
            }, {});

            setGroupedPermissions(grouped);
        }
    }, [permissions]);

    useEffect(() => {
        const comparePermissions = () => {
            const updatedSelections = {};

            Object.entries(groupedPermissions).forEach(([module, { names }]) => {
                updatedSelections[module] = names.filter(perm =>
                    (rolePermissions[module]?.permissions || []).includes(perm)
                );
            });

            setSelectedPermissions(updatedSelections);
        };

        comparePermissions();
    }, [groupedPermissions, rolePermissions]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectModulePermission = (module) => {
        const modulePermissions = groupedPermissions[module]?.names || [];
        const selectedModulePermissions = selectedPermissions[module] || [];

        const areAllPermissionsSelected = modulePermissions.length === selectedModulePermissions.length;

        if (areAllPermissionsSelected) {
            setSelectedPermissions((prevPermissions) => {
                const updatedPermissions = { ...prevPermissions };
                delete updatedPermissions[module];
                return updatedPermissions;
            });
        } else {
            setSelectedPermissions((prevPermissions) => ({
                ...prevPermissions,
                [module]: modulePermissions
            }));
        }
    };

    const handleSelectOption = (module, option) => {
        setSelectedPermissions((prevPermissions) => {
            const isOptionSelected = prevPermissions[module]?.includes(option);

            if (isOptionSelected) {
                return {
                    ...prevPermissions,
                    [module]: prevPermissions[module].filter((opt) => opt !== option)
                };
            } else {
                return {
                    ...prevPermissions,
                    [module]: [...(prevPermissions[module] || []), option]
                };
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const permissionsArray = Object.keys(selectedPermissions).flatMap(module => selectedPermissions[module]);

        Inertia.post(route('role.update', roleId), {
            name: roleName,
            permissions: permissionsArray,
        }, {
            onSuccess: () => {
                handleClose();
            },
            onError: (errors) => {
                console.error('Error updating role:', errors);
            }
        });
    };

    return (
        <>
            <Tooltip content="Edit Role" placement="top">
                <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} size="xl" handler={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Update Role</DialogHeader>
                    <DialogBody>
                        <div className="mb-4">
                            <Input
                                label="Role Name"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <Card className="h-full w-full overflow-scroll">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD1.map((head) => (
                                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                                        {Object.entries(groupedPermissions).map(([module, { names, count }]) => (
                                            <React.Fragment key={module}>
                                                <tr>
                                                    <td className="p-4">
                                                        <Checkbox
                                                            label={module}
                                                            checked={
                                                                names.length && 
                                                                selectedPermissions[module]?.length === names.length
                                                            }
                                                            onChange={() => handleSelectModulePermission(module)}
                                                        />
                                                    </td>
                                                    <td className="p-4 bg-blue-gray-50/50">
                                                        {names.map((perm) => (
                                                            <Checkbox
                                                                key={perm}
                                                                label={
                                                                    <Typography variant="small" color="gray">
                                                                        {perm}
                                                                    </Typography>
                                                                }
                                                                checked={selectedPermissions[module]?.includes(perm) || false}
                                                                onChange={() => handleSelectOption(module, perm)}
                                                            />
                                                        ))}
                                                    </td>
                                                    <td className="p-4 bg-blue-gray-50/50">
                                                        <Typography variant="small" color="gray">
                                                            {count}
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleClose}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
