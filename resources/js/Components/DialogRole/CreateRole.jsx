import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";
import { Inertia } from "@inertiajs/inertia";

const TABLE_HEAD1 = ["Model", "Permission"];

export default function CreateRole({ permissions }) {
    const [open, setOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [roleName, setRoleName] = useState('');

    // Convert permissions to an array and group by group
    const permissionsArray = Object.values(permissions).flat();
    const groupedPermissions = permissionsArray.reduce((acc, { name, group }) => {
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(name);
        return acc;
    }, {});

    const handleOpen = (value) => setOpen(value);

    const handleSelectModulePermission = (module) => {
        const isModuleSelected = !!selectedPermissions[module];
        
        if (isModuleSelected) {
            // Deselect the module and all its options
            setSelectedPermissions((prevPermissions) => {
                const updatedPermissions = { ...prevPermissions };
                delete updatedPermissions[module];
                return updatedPermissions;
            });
        } else {
            // Select the module and all its options
            setSelectedPermissions((prevPermissions) => ({
                ...prevPermissions,
                [module]: groupedPermissions[module] || []
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

        // Prepare payload
        const permissionsArray = Object.keys(selectedPermissions).flatMap(module => selectedPermissions[module]);

        // Send data to server using Inertia
        Inertia.post(route('role.store'), {
            name: roleName,
            permissions: permissionsArray,
        }, {
            onSuccess: () => {
                setOpen(false);
                // Optionally refresh or update the roles list
            },
            onError: (errors) => {
                // Handle errors
                console.error('Error creating role:', errors);
            }
        });
    };

    return (
        <>
            <Button className="flex items-center gap-3" size="sm" onClick={() => handleOpen("xl")} variant="gradient">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Role
            </Button>
            <Dialog open={open === "xl"} size={open || "md"} handler={handleOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>Create Role</DialogHeader>
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
                                        {Object.entries(groupedPermissions).map(([module, perms]) => (
                                            <React.Fragment key={module}>
                                                <tr>
                                                    <td className="p-4">
                                                        <Checkbox
                                                            label={module}
                                                            checked={!!selectedPermissions[module]}
                                                            onChange={() => handleSelectModulePermission(module)}
                                                        />
                                                    </td>
                                                    <td className="p-4 bg-blue-gray-50/50">
                                                        {perms.map((perm) => (
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
                            onClick={() => handleOpen(false)} // Close dialog on cancel
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
