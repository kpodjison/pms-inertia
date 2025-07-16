import { IPropertySearchFormData } from "@/types";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { IoMdSearch } from "react-icons/io";
export default function TopBanner() {
    const { data, setData, post, processing, errors, reset } =
        useForm<IPropertySearchFormData>({
            category: "",
            location: "",
        });
    const [locations, setLocations] = useState<string[]>([]);

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
        <div className="w-full h-[85vh]" id="top_banner_section">
            <div className="w-[80%] mx-auto">
                <div className="pt-[200px] px-5 font-extrabold text-[2.2rem] text-white">
                    <h2>With Us Start Your Home Journey,</h2>
                    <h2>Safe, Secure, Stress Free</h2>
                    <h2>HOLA!</h2>
                </div>
                <div className="m-auto bg-[#0009] sm:w-[800px]">
                    <form className="px-8 py-6 mb-4" onSubmit={submit}>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="col-span-2 flex gap-5">
                                <select
                                    name="category"
                                    id="category"
                                    className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                >
                                    <option value="">select a category</option>
                                    <option value="rent">Rent</option>
                                    <option value="sale">Sale</option>
                                </select>
                                <select
                                    name="location"
                                    id="location"
                                    className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleChange}
                                >
                                    <option value="1">select a location</option>
                                    {locations?.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="font-bold bg-[#224056] rounded  p-2 flex justify-center w-full text-white items-center gap-2"
                            >
                                <IoMdSearch size={18} />
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
