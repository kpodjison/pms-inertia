export default function EnquirySection() {
  return (
    <div
      className="w-full h-[95vh] grid grid-cols-1 sm:grid-cols-2 py-10 sm:py-0 sm:items-center text-white"
      id="enquiry_section"
    >
      <div>
        <div className="px-5 font-extrabold text-[1.5rem]">
          <h2>Discover a new way of living</h2>
          <h2>Safe, Secure, Stress Free</h2>
        </div>
        <p className="px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, ex?
          Architecto incidunt sit accusamus beatae.
        </p>
      </div>
      <div className="mx-5" id="contact-form">
        <h5 className="px-8 text-black sm:text-xl font-bold">Make an enquiry</h5>
        <form className="px-8 py-6 mb-4">
          <div className="grid gap-5">
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Your name*"
              className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Your email*"
              className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              name="phone"
              id="phone"
              type="text"
              placeholder="Your phone number*"
              className="shadow bg-white border w-full py-2 px-3 text-black placeholder-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              className="font-bold bg-[#224056] w-32 p-2 flex justify-center"
              href="#"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
