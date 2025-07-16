import BookingProcess from "@/Components/BookingProcess";
import EnquirySection from "@/Components/EnquirySection";
import GuestWrapper from "@/Components/GuestWrapper";
import PropertyCard from "@/Components/PropertyCard";
import TopBanner from "@/Components/TopBanner";
import { Pagination } from "@/Components/ui/pagination";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { apartments } from "@/constants";
import { IProperty, IPropertySearchFormData } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface IPropertyProps {
    properties: IProperty[];
}
export default function Property({ properties }: IPropertyProps) {
    const { data, setData, post, processing, errors, reset } =
        useForm<IPropertySearchFormData>({
            category: "",
            location: "",
        });
    const [locations, setLocations] = useState<string[]>([]);
    const { url } = usePage(); 
    const query = new URLSearchParams(url.split("?")[1] || "");

    const category = query.get("category") || "All";
    const location = query.get("location") || "Anywhere";


    useEffect(() => {
        axios
            .get(`/get-property-locations`)
            .then((res) => {
                setLocations(res?.data?.data);
            })
            .catch((error) => {
                console.log("failed to get locations");
            });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data);

        if (!data?.location) {
            toast.error("Select a location");
            return;
        }

        router.visit(
            `/property?category=${data?.category}&location=${data?.location}`
        );
    };
    return (
        <GuestWrapper>
            <div className="mb-28 w-[90%] 2xl:w-[80%] mx-auto ">
                <ScrollArea className="my-10 h-screen">
                    <div className="grid  grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-gray-200 col-span-1 rounded h-fit">
                            <form
                                className="px-8 py-6 mb-4 space-y-4"
                                onSubmit={submit}
                            >
                                <div className="">
                                    <select
                                        name="category"
                                        id="category"
                                        className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            select a category
                                        </option>
                                        <option value="rent">Rent</option>
                                        <option value="sale">Sale</option>
                                    </select>
                                </div>
                                <div className="">
                                    <select
                                        name="location"
                                        id="location"
                                        className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={handleChange}
                                    >
                                        <option value="1">
                                            select a location
                                        </option>
                                        {locations?.map((item, index) => (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        type="reset"
                                        className="bg-yellow-300 w-full p-3 font-medium"
                                        value="RESET"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-green-300 w-full p-3 font-medium "
                                    >
                                        SEARCH PROPERTY
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2">
                            <div className="w-[90%] mx-auto mb-4">
                                <h4>
                                    Results for category{" "}
                                    <strong>{category}</strong>, location{" "}
                                    <strong>{location}</strong>
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 w-[90%] mx-auto">
                                {properties.map((apartment, index) => (
                                    <PropertyCard
                                        property={apartment}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <EnquirySection />
        </GuestWrapper>
    );
}
