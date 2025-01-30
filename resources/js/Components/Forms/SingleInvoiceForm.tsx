import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ICustomer } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/globalRedux/hooks/hooks";
import {
    addField,
    addInvoice,
    removeField,
    updateDescription,
    updateField,
    updateTotal,
    updateWorkDate,
} from "@/globalRedux/features/adminSlice";

interface ISingleInvoiceFormProp {
    id: number;
}

export default function SingleInvoiceForm({ id }: ISingleInvoiceFormProp) {
    const { data, setData, post, processing, errors, reset } = useForm({
        description: "",
        total: "",
        work_date: "",
        fields: [{ name: "", quantity: "" }],
    });
    const dispatch = useAppDispatch();

    const handleAddFields = () => {
        setData("fields", [...data.fields, { name: "", quantity: "" }]);
        dispatch(addField(id));
    };

    const handleRemoveFields = (index: number) => {
        const updatedFields = data.fields.filter((_, i) => i !== index);
        setData("fields", updatedFields);
        dispatch(removeField({ invoiceIndex: id, fieldIndex: index }));
    };

    const handleChange = (index: number, fieldName: string, value: number) => {
        const updatedFields = data.fields.map((field, i) =>
            i === index ? { ...field, [fieldName]: value } : field
        );
        setData("fields", updatedFields);
        dispatch(
            updateField({
                invoiceIndex: id,
                fieldIndex: index,
                fieldName: fieldName,
                value: value,
            })
        );
    };

    const handleDescription = (e) => {
        setData("description", e.target.value);
        dispatch(
            updateDescription({
                invoiceIndex: id,
                value: e.target.value,
            })
        );
    };
    const handleWorkDate = (e) => {
        setData("work_date", e.target.value);
        dispatch(
            updateWorkDate({
                invoiceIndex: id,
                value: e.target.value,
            })
        );
    };
    const handleTotal = (e) => {
        setData("total", e.target.value);
        dispatch(
            updateTotal({
                invoiceIndex: id,
                value: e.target.value,
            })
        );
    };

    return (
        <>
            <div className="">
                <div className="my-3">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={handleDescription}
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="grid grid-cols-1 my-7 gap-3">
                    <div className="">
                        <InputLabel htmlFor="work_date" value="Work Date" />

                        <TextInput
                            id="work_date"
                            name="work_date"
                            value={data.work_date}
                            className="mt-1 block w-full"
                            autoComplete="work_date"
                            type="date"
                            onChange={handleWorkDate}
                            required
                        />

                        <InputError
                            message={errors.invoice_date}
                            className="mt-2"
                        />
                    </div>
                    <div className="">
                        {data.fields.map((field, index) => (
                            <div key={index} className="grid grid-cols-5 mb-3">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={field.name}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "name",
                                            // @ts-ignore
                                            e?.target?.value
                                        )
                                    }
                                    className="mr-4 p-2 rounded col-span-2"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    min="0"
                                    value={field.quantity}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "quantity",
                                            // @ts-ignore
                                            e.target.value
                                        )
                                    }
                                    className="mr-4 p-2 rounded col-span-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFields(index)}
                                    className="bg-red-700 text-white px-4 cursor-pointer font-bold text-xl w-"
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <InputError
                            // @ts-ignore
                            message={errors?.items}
                            className="mt-2"
                        />
                        <button
                            type="button"
                            onClick={handleAddFields}
                            className="bg-green-600 text-white p-2 mb-10 cursor-pointer rounded"
                        >
                            + Add Item
                        </button>
                        <div className="">
                            <InputLabel htmlFor="total" value="Total" />

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                value={data.total}
                                className="mt-1 block w-full"
                                onChange={handleTotal}
                            />

                            <InputError
                                message={errors.total}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
