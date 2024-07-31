import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const Create = ({ closeModal, onAddProject }) => {
    const [project, setProject] = useState({
        nomProjet: '',
        description: '',
        adresse: '',
        superficieTotale: '',
        documents: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/projects', project, {
            onSuccess: () => {
                onAddProject(project); 
                closeModal();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <Typography variant="h4" color="blue-gray" className="text-center mb-6">
                    Add New Project
                </Typography>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-4">
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Project Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Project Name"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="nomProjet"
                                value={project.nomProjet}
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
                                value={project.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Adresse
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Adresse"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="adresse"
                                value={project.adresse}
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
                                value={project.superficieTotale}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Documents
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Documents"
                                className="!border-gray-300 focus:!border-gray-500"
                                name="documents"
                                value={project.documents}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="mt-6 bg-black text-white" fullWidth>
                        Add Project
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

export default Create;
