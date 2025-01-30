import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
interface FormData {
    title: string;
    description: string;
    price: string;
    type: string;
    street: string;
    city: string;
    category: string;
    size: string;
    region: string;
    bedroom: string;
    bathroom: string;
    furnishing: string;
    yearOfCons: string;
    images: File[]; 
}
export default function PropertyForm() {
      const { status } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        title: "",
        description: "",
        price: "",
        type: "",
        street: "",
        city: "",
        region:"",
        category: "",
        size: "",
        bedroom: "",
        bathroom: "",
        furnishing: "",
        yearOfCons: "",
        images: [],
    });



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const fileArray = Array.from(files);
        setData("images", fileArray);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data)

        post("/admin/dashboard/property", {
            preserveScroll: true,
            onSuccess: () => {
                // if (status?.type == "success")
                    toast.success('Property added successfully');
                    // toast.success(status?.message);
                reset();
            },
            onError: (errors) => {
                // if (status?.type == 'error')
                    toast.error("Failed to add property");
                    
                    // toast.error(status?.message);
                // console.error("Error during submission:", errors);
            },
        });
    };

    return (
        <>
            <div className="p-5">
                <form onSubmit={submit} className="mt-7">
                    <div className="my-2">
                        <InputLabel htmlFor="title" value="Title" />

                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            autoComplete="title"
                            isFocused={true}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="my-3">
                        <InputLabel htmlFor="description" value="Description" />

                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full rounded border-gray-300"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="price" value="Price" />

                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            min={0}
                            step={0.1}
                            value={data.price}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("price", e.target.value)}
                            required
                        />

                        <InputError message={errors.price} className="mt-2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 my-3 gap-3">
                        <div>
                            <InputLabel htmlFor="type" value="Type" />
                            <select
                                className="mt-1 block w-full rounded"
                                id="type"
                                name="type"
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                            >
                                <option value=""> -- Select Type -- </option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                            </select>
                            <InputError
                                message={errors.type}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="category" value="Category" />
                            <select
                                className="mt-1 block w-full rounded"
                                id="category"
                                name="category"
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                            >
                                <option value=""> -- Select Type -- </option>
                                <option value="rent">Rent</option>
                                <option value="sale">Sale</option>
                            </select>
                            <InputError
                                message={errors.category}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <InputLabel htmlFor="size" value="Size" />
                            <TextInput
                                id="size"
                                name="size"
                                value={data.size}
                                type="number"
                                step={0.1}
                                min={0}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("size", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.size}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="bathroom" value="Bathroom" />
                            <TextInput
                                id="bathroom"
                                name="bathroom"
                                value={data.bathroom}
                                type="number"
                                min={0}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("bathroom", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.bathroom}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="bedroom" value="Bedroom" />
                            <TextInput
                                id="bedroom"
                                name="bedroom"
                                value={data.bedroom}
                                type="number"
                                min={0}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("bedroom", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.bedroom}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="furnishing"
                                value="Furnishing"
                            />
                            <select
                                className="mt-1 block w-full rounded"
                                id="furnishing"
                                name="furnishing"
                                onChange={(e) =>
                                    setData("furnishing", e.target.value)
                                }
                            >
                                <option value=""> -- Select -- </option>
                                <option value="none">None</option>
                                <option value="semi">Semi</option>
                                <option value="full">Full</option>
                            </select>
                            <InputError
                                message={errors.furnishing}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="yearOfCons"
                                value="yearOfCons"
                            />
                            <TextInput
                                id="yearOfCons"
                                name="yearOfCons"
                                value={data.yearOfCons}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("yearOfCons", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.yearOfCons}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="images" value="Images" />
                            <input
                                type="file"
                                name="images"
                                id="images"
                                className=" border py-2 px-1 rounded-sm"
                                multiple
                                required
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                            />
                            <InputError
                                message={errors.images}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <p className="mt-5">Address</p>
                    <div className="grid grid-rows-3 gap-3">
                        <div>
                            <InputLabel htmlFor="street" value="Street" />
                            <TextInput
                                id="street"
                                name="street"
                                value={data.street}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("street", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.street}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                name="city"
                                value={data.city}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.city}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="region" value="Region" />
                            <TextInput
                                id="region"
                                name="region"
                                value={data.region}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("region", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.region}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4 !bg-blue-600"
                            disabled={processing}
                        >
                            Add Property
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
