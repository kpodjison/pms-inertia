import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IPrintableInvoice } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface ISingleInvoiceProps {
    target: string;
}

export default function SingleInvoice({ target }: ISingleInvoiceProps) {
    const [invoice, setInvoice] = useState<IPrintableInvoice | null>(null);
    const [showFooter, setShowFooter] = useState(true);
    const [spgInfo, setSpgInfo] = useState({});
    const [targetFlag, setTargetFlag] = useState("");

    const contentToPrint = useRef<HTMLDivElement>(null); // RefObject for printable content
    const { url } = usePage();
    const id = url.split("/").pop();

    const parsedUrl = new URL(window.location.href);
    const printParam = parsedUrl.searchParams.get("print");

    const handlePrint = useReactToPrint({
        contentRef: contentToPrint, // Correctly pass the RefObject
        documentTitle: "SPECIAL GLOW CLEANING SERVICES INVOICE - " + id,
        onAfterPrint: () => setShowFooter(false),
    });

    const printInvoice = () => {
        setShowFooter(true);
        if (invoice && showFooter)
            handlePrint();
    };

    useEffect(() => {
        axios
            .get(`/invoices/${id}`)
            .then((res) => {
                console.log(res.data);
                setInvoice(res.data);
                if (target !== "") {
                    setTargetFlag(target);
                }
            })
            .catch((error) => {
                // console.error("Error", error);
            });
        
        
        axios
            .get(`/institution`)
            .then((res) => {
                console.log(res.data);
                setSpgInfo(res.data);
            })
            .catch((error) => {
                // console.error("Error", error);
            });
    }, [id]);


    useEffect(() => {
        if (printParam && invoice) {
            setShowFooter(true);
            handlePrint(); 
            setTargetFlag("");
            router.visit("/admin/invoices");
        }
    }, [printParam, invoice]);

    return (
        <AuthenticatedLayout>
            <div className="p-8 h-screen overflow-y-scroll mainContent">
                <div className="p-5 w-full">
                    <div className="flex justify-end">
                        <button
                            onClick={printInvoice}
                            className="bg-teal-700 p-2 text-white rounded"
                        >
                            PRINT
                        </button>
                    </div>
                    <div
                        className="min-h-screen relative"
                        id="invoice_sec"
                        ref={contentToPrint} // Printable content ref
                    >
                        {/* Invoice Content */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-[3.5rem] font-bold">
                                    Invoice
                                </h3>
                                {spgInfo ? (
                                    <>
                                        <p className="font-bold text-xl">
                                            {spgInfo?.name}
                                        </p>
                                        <p> {spgInfo?.address}</p>

                                        <p>Tel: {spgInfo?.phone_number}</p>
                                        <p>
                                            Email: &nbsp;
                                            {spgInfo?.email}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-bold text-xl">
                                            Special Glow Cleaning Services
                                        </p>
                                        <p>24 Mansfield Road,s</p>
                                        <p>Luton, LU4 8NA</p>
                                        <p>Tel: 07768379616</p>
                                        <p>
                                            Email:
                                            info@specialglowcleanings.co.uk
                                        </p>
                                    </>
                                )}
                            </div>
                            <div>
                                <img
                                    src="/storage/log-png.png"
                                    width="200"
                                    height="200"
                                    className="rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end items-center mt-5">
                            <div className="grid grid-cols-3 gap-3">
                                <h3 className="font-bold text-xl">Recipient</h3>
                                <div className="col-span-2">
                                    <p className="font-bold text-xl">
                                        {invoice?.customer?.name}
                                    </p>
                                    <p>{invoice?.customer?.street}</p>
                                    <p>{invoice?.customer?.postcode}</p>
                                    <p>{invoice?.customer?.city}</p>
                                    <p>Tel: {invoice?.customer?.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-5">
                            <div className="grid grid-cols-2 gap-9">
                                <div>
                                    <h3 className="font-bold text-xl">
                                        Invoice Number
                                    </h3>
                                    <p>{invoice?.inv_num}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">
                                        Invoice Date
                                    </h3>
                                    <p>{invoice?.invoice_date}</p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <div className="my-8">
                                <table className="w-full text-sm text-left rtl:text-right">
                                    <thead className="text-xs text-white uppercase sp-bbg">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Item / Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Price / Hour
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoice?.grouped_items.map(
                                            (group, groupIndex) => {
                                                // Concatenate all items for this group
                                                const itemsText = group?.items
                                                    .map(
                                                        (item) =>
                                                            `${item.name}/${item.quantity}`
                                                    )
                                                    .join(", ");

                                          

                                                return (
                                                    <tr
                                                        key={`group-${groupIndex}`}
                                                    >
                                                        {/* Work Date */}
                                                        <td className="border px-2 py-3">
                                                            {group?.work_date}
                                                        </td>
                                                        {/* Description */}
                                                        <td className="border px-2 py-3">
                                                            {
                                                                group?.items[0]
                                                                    ?.description
                                                            }
                                                        </td>
                                                        {/* Item / Quantity */}
                                                        <td className="border px-2 py-3">
                                                            {itemsText}
                                                        </td>
                                                        {/* Price / Hour (not relevant when grouped, can use avg or first item amount) */}
                                                        <td className="border px-2 py-3">
                                                            {
                                                                group?.items[0]
                                                                    ?.amount
                                                            }
                                                        </td>
                                                        {/* Total */}
                                                        <td className="border px-2 py-3">
                                                            {
                                                                group?.items[0]
                                                                    ?.amount
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end items-center mt-2 gap-8 font-bold text-xl">
                                <p>Total Due:</p>
                                <p>£ {invoice?.total}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            className={`absolute bottom-0 right-0 left-0 grid grid-cols-3 text-sm px-5 ${
                                !showFooter && "hidden"
                            }`}
                            id="invoice-footer"
                        >
                            <div>
                                <p className="font-bold">Registered Address</p>
                                <p>24 Mansfield Road,s</p>
                                <p>Luton, LU4 8NA</p>
                            </div>
                            <div>
                                <p className="font-bold">Contact Information</p>
                                <p>Special Glow Team</p>
                                <p>Tel: 077768379616</p>
                                <p>Email: info@specialglowcleanings.co.uk</p>
                            </div>
                            <div>
                                <p className="font-bold">Payment Details</p>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <p>Bank Name</p>
                                        <p>Sort-Code</p>
                                        <p>Account No.</p>
                                    </div>
                                    <div>
                                        <p>Lloyds Bank</p>
                                        <p>30-99-50</p>
                                        <p>23305862</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
