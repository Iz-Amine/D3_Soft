import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";

const CreateBloc = ({ closeModal, projets }) => {
    const [bloc, setBloc] = useState({
        nomBloc: '',
        description: '',
        nombreEtages: '',
        nombreAppartements: '',
        superficieTotale: '',
        projetId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBloc((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (value) => {
        setBloc((prevState) => ({
            ...prevState,
            projetId: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('blocs.store'), bloc, {
            onSuccess: () => {
                closeModal();
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <Typography variant="h4" color="blue-gray" className="text-center mb-4">
                    Add New Bloc
                </Typography>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-3">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Select Project
                            </Typography>
                            <Select
                                label="Select Project"
                                value={bloc.projetId}
                                onChange={(e) => handleSelectChange(e.target.value)}
                            >
                                {projets.map((projet) => (
                                    <Option key={projet.idProjet} value={projet.idProjet}>
                                        {projet.nomProjet}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Bloc Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Bloc Name"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="nomBloc"
                                value={bloc.nomBloc}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Description
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Description"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="description"
                                value={bloc.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Floors
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Floors"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="nombreEtages"
                                value={bloc.nombreEtages}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Apartments
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Apartments"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="nombreAppartements"
                                value={bloc.nombreAppartements}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Surface
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Surface"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="superficieTotale"
                                value={bloc.superficieTotale}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="mt-4 bg-black text-white" fullWidth>
                        Add Bloc
                    </Button>
                    <div className="flex justify-center mt-4">
                        <Button onClick={closeModal} variant="text" color="gray">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBloc;
