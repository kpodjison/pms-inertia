import { NotificationTable } from "@/Components/Tables/NotificationTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Notification() {
    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen overflow-y-scroll mainContent">
                <NotificationTable />
            </div>
        </AuthenticatedLayout>
    );
}
