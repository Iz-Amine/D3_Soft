import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Button, Input } from "@material-tailwind/react";

export default function UpdateBloc({ closeModal, onUpdateBloc, blocData }) {
    const [nomBloc, setNomBloc] = useState(blocData.nomBloc);
    const [description, setDescription] = useState(blocData.description);
    const [nombreEtages, setNombreEtages] = useState(blocData.nombreEtages);
    const [nombreAppartements, setNombreAppartements] = useState(blocData.nombreAppartements);
    const [superficieTotale, setSuperficieTotale] = useState(blocData.superficieTotale);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBloc = {
            id: blocData.id,
            nomBloc,
            description,
            nombreEtages,
            nombreAppartements,
            superficieTotale,
        };

        Inertia.put(`/blocs/update/${blocData.id}`, updatedBloc, {
            onSuccess: () => {
                onUpdateBloc(updatedBloc);
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input 
                    label="Bloc Name" 
                    value={nomBloc} 
                    onChange={(e) => setNomBloc(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-4">
                <Input 
                    label="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-4">
                <Input 
                    label="Floors" 
                    value={nombreEtages} 
                    onChange={(e) => setNombreEtages(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-4">
                <Input 
                    label="Apartments" 
                    value={nombreAppartements} 
                    onChange={(e) => setNombreAppartements(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-4">
                <Input 
                    label="Surface" 
                    value={superficieTotale} 
                    onChange={(e) => setSuperficieTotale(e.target.value)} 
                    required 
                />
            </div>
            <div className="flex justify-end">
                <Button variant="text" onClick={closeModal}>Cancel</Button>
                <Button type="submit" className="ml-2">Update Bloc</Button>
            </div>
        </form>
    );
}
