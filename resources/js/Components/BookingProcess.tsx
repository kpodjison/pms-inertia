import BookingProcessCard from "./BookingProcessCard";
import { PiBuildingApartment } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { MdOutlinePageview } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { BsFillAwardFill } from "react-icons/bs";
import { GiHouseKeys } from "react-icons/gi";
export default function BookingProcess() {
  return (
      <div className="w-[80%] mx-auto my-16">
          <div className="flex flex-col justify-center text-black items-center">
              <h3 className="text-xl font-bold">Whant a perfect home?</h3>
              <p>Discover how it works?</p>
          </div>
          <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <BookingProcessCard
                      title="Find real estate"
                      description="Browse properties that match your needs."
                      icon={<MdOutlinePageview size={45} />}
                  />
                  <BookingProcessCard
                      title="Meet realtor"
                      description="Connect with a trusted real estate agent."
                      icon={<FaRegHandshake size={45} />}
                  />
                  <BookingProcessCard
                      title="View & Inspection"
                      description="Visit and inspect the shortlisted properties."
                      icon={<PiBuildingApartment size={45} />}
                  />
                  <BookingProcessCard
                      title="Documentation"
                      description="Prepare and review all paperwork."
                      icon={<IoDocumentsOutline size={45} />}
                  />
                  <BookingProcessCard
                      title="Aggreement"
                      description="Sign the final purchase agreement."
                      icon={<BsFillAwardFill size={45} />}
                  />
                  <BookingProcessCard
                      title="Take the keys"
                      description="Receive keys and move in!"
                      icon={<GiHouseKeys size={45} />}
                  />
              </div>
          </div>
      </div>
  );
}
