import BookingProcess from "@/Components/BookingProcess";
import EnquirySection from "@/Components/EnquirySection";
import GuestWrapper from "@/Components/GuestWrapper";
import PropertyCard from "@/Components/PropertyCard";
import TopBanner from "@/Components/TopBanner";
import { apartments } from "@/constants";
import { IProperty } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [properties, setProperties] = useState<IProperty[]>([]);
    useEffect(() => {
        axios
            .get("/property-all")
            .then((res) => {
                console.log(res.data.data);
                setProperties(res.data.data);
            })
            .catch((error) => {
                //   console.log("Error", error);
            });
    }, []);
    return (
        <GuestWrapper>
            <section>
                <TopBanner />
                <div>
                    <BookingProcess />
                    <div className="flex flex-col justify-center text-black items-center mt-16">
                        <h3 className="text-xl font-bold">
                            Our choices of popular homes
                        </h3>
                        <p>Discover how it works?</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-[80%] mx-auto mt-5">
                        {properties.map((apartment, index) => (
                            <PropertyCard property={apartment} key={index} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center w-full my-16">
                        <a
                            href="/property"
                            className="text-white bg-[#224056] p-3 text-center"
                        >
                            Browse More Properties
                        </a>
                    </div>
                </div>
                <div className="bg-gray-200 py-16">
                    <div className="flex flex-col justify-center text-black items-center">
                        <h3 className="text-xl font-bold">Need a tour?</h3>
                        <p>Our experts are ready to assist you</p>
                        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-5 w-[80%] mx-auto my-10">
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    <div>
                                        <h6>title</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    <div>
                                        <h6>title</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    <div>
                                        <h6>title</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    <div>
                                        <h6>title</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="" id="tour_section">
                                <div className="showcase"></div>
                                <div className="top-box top-box-a"></div>
                                <div className="top-box top-box-b"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-16">
                    <div className="flex flex-col justify-center text-black items-center">
                        <h3 className="text-xl font-bold">
                            See what others said about us?
                        </h3>
                        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-5 w-[80%] mx-auto my-10 space-y-4">
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="./banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6>John Doe</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="./banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6>Janet Doe</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="./banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6>Mike Doe</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="/banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6>John Doe</h6>
                                        <p>
                                            titsome text her some text her some
                                            text hersome text hersome text
                                            hersome text here
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EnquirySection />
            </section>
        </GuestWrapper>
    );
}
