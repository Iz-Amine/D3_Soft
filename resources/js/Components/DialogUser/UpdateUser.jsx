import React from "react";
import {
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Checkbox, Tooltip, IconButton

} from "@material-tailwind/react";
import { Inertia } from '@inertiajs/inertia'; // Assurez-vous d'avoir installé @inertiajs/inertia
import { PencilIcon } from "@heroicons/react/24/solid";

export default function UpdateUser({ roles, user }) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        fname: "",
        lname: "",
        email: "",
        telephone: "",
        adresse: "",
        CNI: "",
        dateNaissance: "",
        roleIds: [],
        password: "", // Ajouté pour le mot de passe
        password_confirmation: "" // Ajouté pour la confirmation du mot de passe
    });

    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        // Initialize form data with user data
        if (user) {
            setFormData({
                fname: user.fname || "",
                lname: user.lname || "",
                email: user.email || "",
                telephone: user.telephone || "",
                adresse: user.adresse || "",
                CNI: user.CNI || "",
                dateNaissance: user.dateNaissance || "",
                roleIds: user.roles.map(role => role.id),
                password: "", // Réinitialiser le mot de passe
                password_confirmation: "" // Réinitialiser la confirmation du mot de passe
            });
        }
    }, [user]);

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRoleChange = (e, roleId) => {
        const checked = e.target.checked;
        setFormData(prevState => ({
            ...prevState,
            roleIds: checked
                ? [...prevState.roleIds, roleId]
                : prevState.roleIds.filter(id => id !== roleId)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fname) newErrors.fname = "First Name is required.";
        if (!formData.lname) newErrors.lname = "Last Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (formData.password !== formData.password_confirmation) {
            newErrors.password = "Passwords do not match.";
        }
        if (!formData.roleIds.length) newErrors.roleIds = "At least one role must be selected.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            Inertia.post(route('user.update', user.id), formData, {
                onSuccess: () => {
                    console.log('User updated successfully!');
                    handleOpen(); // Close the dialog
                },
                onError: (errors) => {
                    console.log('Error updating user:', errors);
                },
            });
        }
    };

    return (
        <>
            <Tooltip content="Modifier l'utilisateur" placement="top">
                <IconButton onClick={handleOpen} className="bg-black mr-1">
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>


            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Mettre à jour l'utilisateur</DialogHeader>
                <DialogBody>
                    <div className="mb-4">
                        <Input
                            label={<><span className="text-red-500">*</span> Prénom</>}
                            name="fname"
                            type="text"
                            value={formData.fname}
                            onChange={handleChange}
                            error={errors.fname}
                        />
                        {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                    </div>

                    <div className="mb-4">
                        <Input
                            label={<><span className="text-red-500">*</span> Nom</>}
                            name="lname"
                            type="text"
                            value={formData.lname}
                            onChange={handleChange}
                            error={errors.lname}
                        />
                        {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
                    </div>

                    <div className="mb-4">
                        <Input
                            label={<><span className="text-red-500">*</span> Email</>}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Mot de passe"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Confirmer le mot de passe"
                            name="password_confirmation"
                            type="password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Téléphone"
                            name="telephone"
                            type="tel"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Adresse"
                            name="adresse"
                            type="text"
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="CNI"
                            name="CNI"
                            type="text"
                            value={formData.CNI}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Date de naissance"
                            name="dateNaissance"
                            type="date"
                            value={formData.dateNaissance}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <h3>Rôles <span className="text-red-500">*</span></h3>
                        <div className="flex flex-wrap gap-4">
                            {roles.map((role) => (
                                <div key={role.id} className="flex items-center">
                                    <Checkbox
                                        id={`role-${role.id}`}
                                        value={role.id}
                                        checked={formData.roleIds.includes(role.id)}
                                        onChange={(e) => handleRoleChange(e, role.id)}
                                    />
                                    <label htmlFor={`role-${role.id}`} className="ml-2">
                                        {role.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.roleIds && <p className="text-red-500 text-sm">{errors.roleIds}</p>}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Annuler</span>
                    </Button>
                    <Button variant="gradient" color="black" onClick={handleSubmit}>
                        <span>Confirmer</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
