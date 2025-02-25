import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    HomeModernIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function SideBar() {
    const [open, setOpen] = React.useState(0);


    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };


    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Link href="/">
                    <Typography variant="h5" color="blue-gray">
                        <div className="shrink-0 flex items-center gap-4 fa-lg">
                            <ApplicationLogo className="flex fa-lg h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            Sidebar
                        </div>
                    </Typography>
                </Link>
            </div>
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(1)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link href={route('dashboard')}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Analytics
                                </ListItem>
                            </Link>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Reporting
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Projects
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                                }`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-b-0 p-3"
                        >
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                            >
                                E-Commerce
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Orders
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Products
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Link href={route('roles')}>
                    <ListItem>
                        <ListItemPrefix>
                            <i class="fa-solid fa-gavel"></i>
                        </ListItemPrefix>
                        Roles & Permissions
                    </ListItem>
                </Link>
                <Link href={route('users')}>
                    <ListItem>
                        <ListItemPrefix>
                            <i class="fa-solid fa-users"></i>
                        </ListItemPrefix>
                        Users
                    </ListItem>
                </Link>
                <Link href={route('profile.edit')}>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                </Link>
                
                
                <Accordion
            open={open === 3}
            icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                />
            }
        >
            <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3"
                >
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                    >
                        Paramétrage
                    </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <Link href={route("project.index")}>
                <ListItem>
                <ListItemPrefix>
                            <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-5"
                            />
                        </ListItemPrefix>
                    Projet
                </ListItem>
                </Link>
                <Link href={route("blocs.index")}>
                                <ListItem>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Bloc
                                </ListItem>
                            </Link>
                    <ListItem>
                        <ListItemPrefix>
                            <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-5"
                            />
                        </ListItemPrefix>
                        Residence
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <ChevronRightIcon
                                strokeWidth={3}
                                className="h-3 w-5"
                            />
                        </ListItemPrefix>
                        Bien
                    </ListItem>
                </List>
            </AccordionBody>
        </Accordion>

                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>

                    <Link href={route('logout')} method="post" as="button">Log Out</Link>

                </ListItem>
            </List>
        </Card>
    );
}
