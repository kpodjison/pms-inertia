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
                            <div>
                                <img
                                    src="/storage/inspection_1.jpg"
                                    className="image-fit"
                                />
                            </div>
                            <div className="flex justify-center items-center text-center">
                                <p>
                                    Our experts are ready to assist you with all
                                    your real estate needs! Whether you're
                                    looking to buy or rent, our dedicated team
                                    is here to help you find the perfect
                                    property. With expert market knowledge and
                                    personalized service, we make the process
                                    seamless and stress-free. Contact us today
                                    and let us help you find your next home!
                                </p>
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
                                        src="/storage/banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6 className="font-semibold">
                                            Azariah Nii
                                        </h6>
                                        <p className="text-muted-foreground">
                                            The entire process was smooth and
                                            stress-free. I found my dream home
                                            in just a few visits!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="/storage/banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6 className="font-semibold">
                                            Price Commeh
                                        </h6>
                                        <p className="text-muted-foreground">
                                            Excellent service from start to
                                            finish. The realtor was professional
                                            and very responsive.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="/storage/banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6 className="font-semibold">
                                            Yaw Manu
                                        </h6>
                                        <p className="text-muted-foreground">
                                            They handled all the paperwork and
                                            made buying a home feel easy and
                                            safe.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3">
                                    <img
                                        src="/storage/banner_img.jpg"
                                        className="rounded-full w-16 h-16"
                                    />

                                    <div>
                                        <h6 className="font-semibold">
                                            Afia A.
                                        </h6>
                                        <p className="text-muted-foreground">
                                            rom viewing to getting the keys,
                                            everything was fast and efficient.
                                            Highly recommended!
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
