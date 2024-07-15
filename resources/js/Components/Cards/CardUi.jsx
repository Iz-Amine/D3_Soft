import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export default function CardUi() {
    return (
        <Card>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                <div className="flex items-center">
                    <div className="bg-gray-200 p-2 rounded-full">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" /></svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500">Today's Money</p>
                        <p className="text-2xl font-semibold">$53k</p>
                    </div>
                </div>
                <div className="mt-4 text-green-500">
                    +55% than last week
                </div>
            </div>
        </Card>
    );
}