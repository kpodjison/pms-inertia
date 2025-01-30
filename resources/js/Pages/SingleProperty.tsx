import AppartmentContactInfo from "@/Components/AppartmentContactInfo";
import GuestWrapper from "@/Components/GuestWrapper";
import InputError from "@/Components/InputError";
import PropertyDetailsCard from "@/Components/PropertyDetailsCard";
import { IProperty } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

import { IoBedOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { LuShowerHead, LuSofa } from "react-icons/lu";
import { PiBuildingsThin } from "react-icons/pi";
import { toast } from "sonner";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ISinglePropertyProps {
    property: IProperty;
}
interface FormData {
    id: number | null;
    name: string;
    email: string;
    phone: string;
}
const SingleProperty = ({ property }: ISinglePropertyProps) => {
    const [data, setData] = useState<FormData>({
        id: null,
        name: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState<FormData>({
        id: null,
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        setData({ ...data, ["id"]: property?.id });
    }, [property]);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        axios
            .post("/property-enquire", data)
            .then((res) => {
                toast.success(res?.data?.message);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);                    
                }
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                }
            });

        // post("/property-enquire", {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         // if (status?.type == "success")
        //         toast.success(
        //             "Request submitted successfully. Our team will get in touch shortly"
        //         );
        //         // toast.success(status?.message);
        //         reset();
        //     },
        //     onError: (errors) => {
        //         // if (status?.type == 'error')
        //         toast.error("Failed to submit request");

        //         // toast.error(status?.message);
        //         // console.error("Error during submission:", errors);
        //     },
        // });
    };
    return (
        <GuestWrapper>
            <div className="w-full">
                <Swiper
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {property?.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative overflow-hidden sm:h-[90vh] w-full">
                                <img
                                    className=""
                                    src={`/storage/propertyimage/${img?.url}`}
                                    alt="property-img"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="grid  grid-cols-1 sm:grid-cols-3 gap-5 w-[80%] mx-auto my-10">
                <div className="col-span-2">
                    <div>
                        <h2 className="font-bold text-[2.5rem] mb-2">
                            {property?.title}
                        </h2>
                        <div className="flex justify-start space-x-2 text-sm text-gray-500 uppercase">
                            <Link href="#">{property?.type}</Link>{" "}
                            <span>|</span>
                            <Link href="#">PROPERTY ID: {property?.code}</Link>
                        </div>
                        <div>
                            <h4 className="font-bold mt-8 mb-2 text-[1.6rem]">
                                Description
                            </h4>
                            <p className="text-gray-500">
                                {property?.description}
                            </p>
                            <hr className="my-7" />
                        </div>
                        {/* <div>
                            <h4 className="font-bold mt-8 mb-2 text-[1.6rem]">
                                Property Features
                            </h4>
                            <p className="text-gray-500">
                                Lorem ipsum dolor sit amet, wisi nemore fastidii
                                at vis, eos equidem admodum disputando ea. An
                                duis dolor appellantur mea
                            </p>
                        </div> */}
                        <div>
                            <h4 className="font-bold mt-8 mb-2 text-[1.2rem]">
                                Property Details
                            </h4>
                            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
                                <div className="">
                                    <PropertyDetailsCard
                                        icon={<PiBuildingsThin />}
                                        info={
                                            <>
                                                {property?.size} m<sup>2</sup>
                                            </>
                                        }
                                        name="Size"
                                    />
                                    <PropertyDetailsCard
                                        icon={<IoBedOutline />}
                                        info={property?.bedroom}
                                        name="Bedrooms"
                                    />
                                    <PropertyDetailsCard
                                        icon={<LuShowerHead />}
                                        info={property?.bathroom}
                                        name="Bathroom"
                                    />
                                    <PropertyDetailsCard
                                        icon={<LuSofa />}
                                        info={property?.furnishing}
                                        name="Furnishing"
                                    />
                                </div>
                                <div>
                                    <PropertyDetailsCard
                                        icon={<IoCalendarNumberOutline />}
                                        info={property?.yearOfCons}
                                        name="Year of Contructor"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 relative md:min-h-[1190px]">
                    <div className="md:absolute w-full -top-16 z-10 space-y-7">
                        <div className="border  rounded p-5 bg-white shadow-sm">
                            <div className="flex gap-2 justify-between items-center">
                                <div className="flex flex-row items-center gap-4 text-[1.2rem] font-semibold">
                                    Price
                                </div>
                                <p className="font-semibold">
                                    {property?.category === "rent" && (
                                        <>
                                            {" "}
                                            ₵ {property?.price}
                                            <small>/month</small>
                                        </>
                                    )}
                                </p>
                            </div>
                            {/* <hr className="my-2" /> */}
                        </div>
                        <div className="border  rounded p-4 bg-emerald-100 shadow-sm">
                            <h5 className="text-[1.2rem] font-semibold mb-2">
                                Contact
                            </h5>
                            <AppartmentContactInfo
                                title={"Telephone"}
                                info={"+233595888875"}
                            />
                            <AppartmentContactInfo
                                title={"Mobile"}
                                info={"+233595888875"}
                            />
                            <AppartmentContactInfo
                                title={"Whatsapp"}
                                info={"+233595888875"}
                            />
                            <AppartmentContactInfo
                                title={"Email"}
                                info={"info@pmsa.com"}
                            />
                        </div>
                        <div className="border  rounded p-4 bg-gray-300 shadow-sm">
                            <h5 className="text-[1.2rem] font-semibold mb-2">
                                Schedule a tour
                            </h5>
                            <form className="mb-4" onSubmit={submit}>
                                <div className="grid gap-5">
                                    <input
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Your name*"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                ["name"]: e.target.value,
                                            })
                                        }
                                        className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                    <input
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Your email*"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                ["email"]: e.target.value,
                                            })
                                        }
                                        className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                    <input
                                        name="phone"
                                        id="phone"
                                        type="text"
                                        placeholder="Your phone number*"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                ["phone"]: e.target.value,
                                            })
                                        }
                                        className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                    <button
                                        type="submit"
                                        className="font-bold bg-[#224056] w-32 p-2 flex justify-center text-white"
                                    >
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestWrapper>
    );
};

export default SingleProperty;
