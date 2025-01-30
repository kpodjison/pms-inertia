import BookingProcess from "@/Components/BookingProcess";
import EnquirySection from "@/Components/EnquirySection";
import GuestWrapper from "@/Components/GuestWrapper";
import PropertyCard from "@/Components/PropertyCard";
import TopBanner from "@/Components/TopBanner";
import { Pagination } from "@/Components/ui/pagination";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { apartments } from "@/constants";
import { IProperty } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";


interface IPropertyProps{
    properties:IProperty[]
}
export default function Property({
    properties,
}:IPropertyProps) {
    // const [properties, setProperties] = useState<IProperty[]>([]);
    // useEffect(() => {
    //     axios
    //         .get("/admin/dashboard/property")
    //         .then((res) => {
    //             console.log(res.data.data);
    //             setProperties(res.data.data);
    //         })
    //         .catch((error) => {
    //             //   console.log("Error", error);
    //         });
    // }, []);
    return (
        <GuestWrapper>
            <div className="mb-28">
                <ScrollArea className="w-[90%] mx-auto my-10 h-screen">
                    <div className="grid  grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-gray-200 col-span-1 rounded h-fit">
                            <form className="px-8 py-6 mb-4 space-y-4">
                                <div className="">
                                    <select
                                        name="category"
                                        id="category"
                                        className="shadow bg-white border w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="1">
                                            -- select a category --
                                        </option>
                                        <option value="1">Rent</option>
                                        <option value="1">Buy</option>
                                    </select>
                                </div>
                                <div className="">
                                    <select
                                        name="location"
                                        id="location"
                                        className="shadow bg-white border w-full  p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="1">
                                            -- select a location --
                                        </option>
                                        <option value="1">Loc 1</option>
                                        <option value="1">Loc 2</option>
                                        <option value="1">Loc 3</option>
                                        <option value="1">Loc 4</option>
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
