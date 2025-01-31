import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { INotification } from "@/types";
import { GlobalAlertDialog } from "../GlobalAlertDialog";
import { toast } from "sonner";

export function NotificationTable() {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [refresh, setRefresh] = useState(false);

    const handleDelete = () => {
        console.log("Item deleted!");
        // Add your delete logic here
    };
    const handleUpdate = (propertyId: number | undefined, publish: string) => {
        axios
            .post(`/admin/dashboard/property/publish/${propertyId}`)
            .then((res) => {
                if (publish === "publish") {
                    toast.success("Property Published Successfully");
                } else if (publish === "unpublish") {
                    toast.success("Property unpublished Successfully");
                }

                setRefresh(true);
            })
            .catch((error) => {
                toast.error("Failed to Publish Property");
                setRefresh(true);
            });
    };

    useEffect(() => {
        axios
            .get("/admin/dashboard/notifications")
            .then((res) => {
                setNotifications(res.data.data);
            })
            .catch((error) => {
                //   console.log("Error", error);
            });
    }, [refresh]);
    return (
        <>
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
                NOTIFICATIONS
            </h2>

            <Table>
                <TableHeader>
                    <TableRow className="uppercase">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">
                            Property ID
                        </TableHead>
                        <TableHead className="tableHeader">Name</TableHead>
                        <TableHead className="tableHeader">Email</TableHead>
                        <TableHead className="tableHeader">Phone</TableHead>
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {notifications.map((notice, index) => (
                        <TableRow key={notice.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <a
                                    className="text-blue-600"
                                    href={`/property/${notice?.property_id}`}
                                    target="_blank"
                                >
                                    {notice?.property?.code}
                                </a>
                            </TableCell>
                            <TableCell>{notice.name}</TableCell>
                            <TableCell>{notice.email}</TableCell>
                            <TableCell>{notice.phone}</TableCell>

                            <TableCell className="grid grid-cols-1  space-x-2 space-y-2  w-[150px] bg-gray-200 table_actions float-end">
                                <a
                                    className="font-medium bg-green-500 text-white px-3 py-1 rounded text-center"
                                    href="#"
                                >
                                    Reply
                                </a>

                                <GlobalAlertDialog
                                    actionTitle="Delete"
                                    title="Delete notice"
                                    description="Are you sure you want to delete this notice?"
                                    button="Delete"
                                    btnCol="bg-red-500"
                                    btnColHover="bg-red-400"
                                    id={notice?.id}
                                    action={handleDelete}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {notifications.length > 0 && (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={1}
                                className="text-right font-bold text-blue-600"
                            >
                                Total:
                            </TableCell>
                            <TableCell className="font-bold text-blue-600">
                                &nbsp; {notifications.length}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </>
    );
}
