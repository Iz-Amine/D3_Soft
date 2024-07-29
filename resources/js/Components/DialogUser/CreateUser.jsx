import React, { useState } from "react";
import {
    Input,
    Button, Dialog, DialogHeader, DialogBody, DialogFooter, Checkbox
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Inertia } from '@inertiajs/inertia';

export default function CreateUser({ roles }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        password_confirmation: '',
        telephone: '',
        adresse: '',
        CNI: '',
        dateNaissance: '',
        roles: [],
    });
    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setOpen(!open);
        setErrors({}); // Clear errors when opening the dialog
    };
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setForm((prevForm) => {
            if (checked) {
                return { ...prevForm, roles: [...prevForm.roles, value] };
            } else {
                return { ...prevForm, roles: prevForm.roles.filter((role) => role !== value) };
            }
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.fname) newErrors.fname = "First Name is required.";
        if (!form.lname) newErrors.lname = "Last Name is required.";
        if (!form.email) newErrors.email = "Email is required.";
        if (!form.password) newErrors.password = "Password is required.";
        if (form.password !== form.password_confirmation) {
            newErrors.password_confirmation = "Passwords do not match.";
        }
        if (!form.roles.length) newErrors.roles = "At least one role must be selected.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            Inertia.post(route('user.store'), form);
            handleOpen(); // Close the dialog after submission
        }
    };

    return (
        <>
            <Button className="flex items-center gap-3" size="sm" onClick={handleOpen} variant="gradient">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> ajouter un utilisateur
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Créer un utilisateur</DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <div className="mb-4">
                            <Input
                                label={<><span className="text-red-500">*</span> Prénom</>}
                                name="fname"
                                type="text"
                                value={form.fname}
                                onChange={handleChange}
                            />
                            {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                        </div>

                        <div className="mb-4">
                            <Input
                                label={<><span className="text-red-500">*</span> Nom</>}
                                name="lname"
                                type="text"
                                value={form.lname}
                                onChange={handleChange}
                            />
                            {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
                        </div>

                        <div className="mb-4">
                            <Input
                                label={<><span className="text-red-500">*</span> Email</>}
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <Input
                                label={<><span className="text-red-500">*</span> Mot de passe</>}
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label={<><span className="text-red-500">*</span> Confirmer le mot de passe</>}
                                name="password_confirmation"
                                type="password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Téléphone"
                                name="telephone"
                                type="tel"
                                value={form.telephone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Adresse"
                                name="adresse"
                                type="text"
                                value={form.adresse}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="CNI"
                                name="CNI"
                                type="text"
                                value={form.CNI}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Date de naissance"
                                name="dateNaissance"
                                type="date"
                                value={form.dateNaissance}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <h3>Rôles  <span className="text-red-500">*</span></h3>
                            <div className="flex flex-wrap gap-4">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center">
                                        <Checkbox
                                            id={`role-${role.id}`}
                                            value={role.name}
                                            checked={form.roles.includes(role.name)}
                                            onChange={handleRoleChange}
                                        />
                                        <label htmlFor={`role-${role.id}`} className="ml-2">
                                            {role.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
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
                        <Button variant="gradient" color="black" type="submit">
                            <span>Confirmer</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
