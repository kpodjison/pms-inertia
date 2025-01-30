import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { cn } from "@/lib/utils";
import { IImage } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface FormData {
    id: number | null;
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
    images: IImage[];
    newImages?: File[];
}
interface IEditPropertyFormProp {
    propertyId: string;
}
export default function EditPropertyForm({
    propertyId,
}: IEditPropertyFormProp) {
    const { status } = usePage().props;
    const [property, setProperty] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            id:null,
            title: "",
            description: "",
            price: "",
            type: "",
            street: "",
            city: "",
            region: "",
            category: "",
            size: "",
            bedroom: "",
            bathroom: "",
            furnishing: "",
            yearOfCons: "",
            images: [],
            newImages: [],
        });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const fileArray = Array.from(files);
        setData("newImages", fileArray);
    };

    const handleImageDelete = (image: IImage) => {
        if (!isDeleting) {
            setIsDeleting(true);

            axios
                .post(`/admin/dashboard/property-image/delete/`, image)
                .then((res) => {
                    toast.success("Image deleted successfully");

                    setData((prevData) => ({
                        ...prevData,
                        images: prevData.images.filter(
                            (img) => img.id !== image.id
                        ),
                    }));

                    setIsDeleting(false);
                })
                .catch((error) => {
                    toast.error("Failed to delete image!");
                    setIsDeleting(false);
                });
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);

        post("/admin/dashboard/property/update/", {
            preserveScroll: true,
            onSuccess: () => {
                // if (status?.type == "success")
                toast.success("Property added successfully");
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

    useEffect(() => {
        axios
            .get(`/admin/dashboard/property/${propertyId}`)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
                //    setProperties(res.data.data);
            })
            .catch((error) => {
                //   console.log("Error", error);
            });
    }, []);

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
                                value={data?.type}
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
                                value={data?.category}
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
                                value={data?.furnishing}
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
                            <InputLabel htmlFor="newImages" value="Images" />
                            <input
                                type="file"
                                name="newImages"
                                id="newImages"
                                className=" border py-2 px-1 rounded-sm"
                                multiple
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                            />
                            {data?.images && (
                                <>
                                    <small className="text-red-500 text-muted">
                                        {" "}
                                        You can click of the delete icon to
                                        delete images automatically
                                    </small>
                                    <div className="flex gap-1 flex-wrap">
                                        {data?.images.map((item, index) => (
                                            <div>
                                                {" "}
                                                <div className="relative">
                                                    <img
                                                        src={`/storage/propertyimage/${item?.url}`}
                                                        width={80}
                                                        height={80}
                                                        alt={`product-image`}
                                                    />
                                                    <span
                                                        className={cn(
                                                            "absolute right-0 top-0 bg-white p-1 rounded-full cursor-pointer",
                                                            {
                                                                "cursor-not-allowed":
                                                                    isDeleting,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleImageDelete(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src="/storage/icons/bin-red.svg"
                                                            width={10}
                                                            height={10}
                                                            alt="delete-btn"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <InputError
                                        message={errors.images}
                                        className="mt-2"
                                    />
                                </>
                            )}
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
                            Edit Property
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
