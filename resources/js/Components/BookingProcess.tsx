import BookingProcessCard from "./BookingProcessCard";

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
            description="lorem ipsums lo reo jisdj "
            icon="realestate.svg"
          />
          <BookingProcessCard
            title="Meet realtor"
            description="lorem ipsums lo reo jisdj "
            icon="meet.svg"
          />
          <BookingProcessCard
            title="View & Inspection"
            description="lorem ipsums lo reo jisdj "
          />
          <BookingProcessCard
            title="Documentation"
            description="lorem ipsums lo reo jisdj "
          />
          <BookingProcessCard
            title="Aggreement"
            description="lorem ipsums lo reo jisdj "
            icon="aggreement.svg"
          />
          <BookingProcessCard
            title="Take the keys"
            description="lorem ipsums lo reo jisdj "
            icon="keys.svg"
          />
        </div>
      </div>
    </div>
  );
}
