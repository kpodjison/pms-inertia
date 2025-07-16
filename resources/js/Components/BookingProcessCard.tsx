
interface IBookingProcessCardProp{
  title: string;
  description: string;
  icon: React.ReactNode;
}
export default function BookingProcessCard({ title, description, icon }:IBookingProcessCardProp) {
  return (
    <div>
      <div className="max-w-lg rounded overflow-hidden shadow-lg flex flex-row items-center gap-2 p-2 bg-sky-100">
        {icon}
        <div className=" w-full">
                  <h4 className="font-bold">{ title}</h4>
          <p className="text-gray-700 text-base py-1">
           {description}
          </p>
        </div>
      </div>
    </div>
  );
}
