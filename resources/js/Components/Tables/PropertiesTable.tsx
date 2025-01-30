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
import CustomSheet from "../CustomSheet";
import { useEffect, useState } from "react";
import axios from "axios";
import PropertyForm from "../Forms/PropertyForm";
import { IProperty } from "@/types";
import { GlobalAlertDialog } from "../GlobalAlertDialog";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import EditPropertyForm from "../Forms/EditPropertyForm";

export function PropertiesTable() {
    const [properties, setProperties] = useState<IProperty[]>([]);
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
            .get("/admin/dashboard/property")
            .then((res) => {
                setProperties(res.data.data);
            })
            .catch((error) => {
                //   console.log("Error", error);
            });
    }, [refresh]);
    return (
        <>
            <h2 className="text-2xl font-semibold text-center text-blue-600 my-2 mar-regular">
                PROPERTIES
            </h2>
            <CustomSheet children={<PropertyForm />} title="ADD PROPERTY" />

            <Table>
                <TableHeader>
                    <TableRow className="uppercase">
                        <TableHead className="tableHeader">#</TableHead>
                        <TableHead className="tableHeader">Image</TableHead>
                        <TableHead className="tableHeader">Title</TableHead>
                        <TableHead className="tableHeader">
                            Description
                        </TableHead>
                        <TableHead className="tableHeader">
                            Type/Category
                        </TableHead>
                        <TableHead className="tableHeader">Address</TableHead>
                        <TableHead className="tableHeader">Status</TableHead>
                        <TableHead className="text-right tableHeader">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((property, index) => (
                        <TableRow key={property.id} className="table_row">
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <img
                                    src={`/storage/propertyimage/${property?.images[0]?.url}`}
                                    alt="property-image"
                                    width={100}
                                    height={100}
                                />
                            </TableCell>
                            <TableCell>{property.title}</TableCell>
                            <TableCell>{property.description}</TableCell>
                            <TableCell>
                                {property.type} / {property.category}{" "}
                            </TableCell>
                            <TableCell>{`${property?.street},${property?.city} - ${property?.region}`}</TableCell>
                            <TableCell>
                                {property?.is_visible == 1 ? (
                                    <Badge className="bg-green-500 hover:bg-green-400">
                                        Published
                                    </Badge>
                                ) : (
                                    <Badge className="bg-yellow-500 hover:bg-yellow-400">
                                        Unpublished
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="grid grid-cols-1  space-x-2 space-y-2  w-[150px] bg-gray-200 table_actions float-end">
                                <CustomSheet
                                    children={
                                        <EditPropertyForm
                                            propertyId={property.id.toString()}
                                        />
                                    }
                                    title="Edit property"
                                    type="form"
                                    trigerBtnText="Edit"
                                    btnColor="bg-yellow-500"
                                />
                                <a
                                    className="font-medium bg-green-500 text-white px-3 py-1 rounded text-center"
                                    target="_blank"
                                    href={`/property/${property?.id}`}
                                >
                                    View
                                </a>
                                {property?.is_visible != 1 ? (
                                    <GlobalAlertDialog
                                        actionTitle="Publish"
                                        title="Publish Property"
                                        description="Are you sure you want to publish this property?"
                                        button="Publish"
                                        btnCol="bg-blue-500"
                                        btnColHover="bg-blue-400"
                                        id={property?.id}
                                        action={() =>
                                            handleUpdate(
                                                property?.id,
                                                "publish"
                                            )
                                        }
                                    />
                                ) : (
                                    <GlobalAlertDialog
                                        actionTitle="Unpublish"
                                        title="Unpublish Property"
                                        description="Are you sure you want to unpublish this property?"
                                        button="Unpublish"
                                        btnCol="bg-blue-500"
                                        btnColHover="bg-blue-400"
                                        id={property?.id}
                                        action={() =>
                                            handleUpdate(
                                                property?.id,
                                                "unpublish"
                                            )
                                        }
                                    />
                                )}
                                <GlobalAlertDialog
                                    actionTitle="Delete"
                                    title="Delete Property"
                                    description="Are you sure you want to delete this property?"
                                    button="Delete"
                                    btnCol="bg-red-500"
                                    btnColHover="bg-red-400"
                                    id={property?.id}
                                    action={handleDelete}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {properties.length > 0 && (
                        <TableRow className="text-xl ">
                            <TableCell
                                colSpan={1}
                                className="text-right font-bold text-blue-600"
                            >
                                Total:
                            </TableCell>
                            <TableCell className="font-bold text-blue-600">
                                &nbsp; {properties.length}
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </>
    );
}
