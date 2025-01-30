import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/Components/ui/alert-dialog"
import { useState } from "react";

interface IGlobalAlertDialogProps {
    button: string;
    title: string;
    description: string;
    actionTitle: string;
    btnCol: string;
    btnColHover: string;
    id: number;
    action?: (id?:number) => void;
}

export function GlobalAlertDialog({
    button,
    title,
    description,
    action,
    actionTitle,
    btnCol,
    btnColHover
}: IGlobalAlertDialogProps) {
    const [open, setOpen] = useState(false); 

    const handleActionClick = async (event: React.MouseEvent) => {
        event.preventDefault(); 
        if (action) {
            await action(); 
        }
        setOpen(false); 
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {" "}
            {/* Controlled open state */}
            <AlertDialogTrigger asChild>
                <button
                    className={`font-medium ${btnCol} text-white px-3 py-1 rounded text-center`}
                    onClick={() => setOpen(true)} // Open dialog when button is clicked
                >
                    {button}
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-900">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleActionClick}
                        className={`${btnCol } hover:${btnColHover}`}
                    >
                        {actionTitle}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
