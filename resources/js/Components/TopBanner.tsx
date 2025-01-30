
export default function TopBanner() {
  return (
    <div className="w-full h-[85vh]" id="top_banner_section">
      <div className="pt-[200px] px-5 font-extrabold text-[2.2rem] text-white">
        <h2>With Us Start Your Home Journey,</h2>
        <h2>Safe, Secure, Stress Free</h2>
        <h2>HOLA!</h2>
      </div>
        <div className="m-auto bg-[#0009] sm:w-[800px]">
          <form className="px-8 py-6 mb-4">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2 flex gap-5">
                <select
                  name="category"
                  id="category"
                  className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="1">Category</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                </select>
                <select
                  name="category"
                  id="category"
                  className="shadow bg-white border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="1">Location</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                </select>
              </div>
              <button type='submit'
                className="font-bold bg-[#224056] rounded  p-2 flex justify-center w-full text-white"
              >
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                Search
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
