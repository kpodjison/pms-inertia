import { Link } from "@inertiajs/react";
import { IoBedOutline } from "react-icons/io5";
import { LuShowerHead } from "react-icons/lu";
import { PiBuildingsThin } from "react-icons/pi";
import { Badge } from "./ui/badge";
import { IProperty } from "@/types";

interface IPropertyCardProp{
  property:IProperty
}

export default function PropertyCard({ property }:IPropertyCardProp) {
  return (
      <>
          <div className="max-w-lg rounded overflow-hidden shadow-md relative">
              <div className="h-52 sm:h-60">
                  {property?.images.slice(0, 1).map((img, index) => (
                      <>
                          <Link href={`/property/${property?.id}`}>
                              <img
                                  className="w-full rounded object-cover h-48 sm:h-60"
                                  src={`/storage/propertyimage/${img?.url}`}
                                  alt=""
                                  key={index}
                              />
                          </Link>
                      </>
                  ))}
              </div>

              <div className="p-3 space-y-1 ">
                  <div className="flex">
                      <img
                          src="/storage/icons/location.svg"
                          alt="loc-icon"
                          width={18}
                          height={18}
                      />
                      <span className="capitalize">
                          {" "}
                          {property?.type} - {property?.city}
                      </span>
                  </div>
                  <h5 className="font-bold text-xl">
                      {property?.title}{" "}
                      <Badge
                          className={
                              property?.category == "Rent"
                                  ? "bg-yellow-400 text-black"
                                  : "bg-green-500"
                          }
                      >
                          {property?.category}
                      </Badge>
                  </h5>

                  <p className="text-gray-700 text-base py-1">
                      {property?.description}
                  </p>
                  <hr />
                  <div className="flex justify-between items-center">
                      <p className="font-bold text-xl">₵ {property?.price} </p>
                      <div className="flex gap-2 items-center">
                          <p className="flex flex-row items-center">
                              <PiBuildingsThin />{" "}
                              <small>
                                  {property?.size}m
                                  <sup>2</sup>
                              </small>
                          </p>
                          <p className="flex flex-row items-center">
                              <IoBedOutline />{" "}
                              <small>{property?.bedroom}</small>
                          </p>
                          <p className="flex flex-row items-center">
                              <LuShowerHead />{" "}
                              <small>{property?.bathroom}</small>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}
