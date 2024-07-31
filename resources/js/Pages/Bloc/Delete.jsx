import React from 'react';
import { Button, Typography } from "@material-tailwind/react";

export default function Delete({ closeModal, onDeleteBloc, blocId }) {
    const handleDelete = () => {
        onDeleteBloc(blocId);
        closeModal();
    };

    return (
        <div>
            <Typography variant="h6" color="red" className="mb-4">
                Are you sure you want to delete this bloc?
            </Typography>
            <div className="flex justify-end">
                <Button variant="text" onClick={closeModal}>Cancel</Button>
                <Button color="red" className="ml-2" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
}
