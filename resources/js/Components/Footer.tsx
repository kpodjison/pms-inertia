
export default function Footer() {
  return (
    <section className="bg-[#224056] p-4 text-gray-400">
      <footer className="grid grid-cols-1 gap-2  sm:grid-cols-3 mb-2" >
        <div>
          <div className="space-y-2 text-[0.7rem] sm:text-[0.9rem]">
            <img
              src="/storage/logo.jpg"
              className="w-16 h-16 mb-2"
            />
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum deleniti vitae qui provident, aperiam nam, aut hic exercitationem nobis eos placeat. Nihil in blanditiis assumenda debitis nulla iure nobis, quo ipsum delectus laudantium quis ab molestias, nisi libero, neque obcaecati pariatur reiciendis aliquid ea. Iure molestias sapiente fugit inventore eaque.
            </p>
          </div>
        </div>
        <div>
          <div>
            <h6 className="mb-3">Contact</h6>
            <div className="space-y-2 text-[0.7rem] sm:text-[0.9rem]">
              <p className="mb-"> Box 11224,Accra </p>
              <p className="card-text"> Phone:(00233) 112234407333 </p>
              <p className="card-text ">
                Email:{" "}
                <a href="mailto:samuela@gmail.com" className="lnk">
                  pms@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h6 className="mb-3">Quick Links</h6>
            <div>
              <ul className="space-y-2 text-[0.7rem] sm:text-[0.9rem]">
                <li>{/* <Link href="/about">About</Link>{" "} */} link one</li>
                <li>{/* <Link href="/about">About</Link>{" "} */} link one</li>
                <li>{/* <Link href="/about">About</Link>{" "} */} link one</li>
                <li>{/* <Link href="/about">About</Link>{" "} */} link one</li>
                <li>{/* <Link href="/about">About</Link>{" "} */} link one</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <hr className="" />
      <div className="flex justify-between text-[0.7rem] sm:text-[0.9rem] py-2">
        <p>Copyright © PMS. All rights reserved</p>
        <p className="space-x-4">Follow Us: &nbsp; 
          <span>Instagram</span>
          <span>Youtube</span>
          <span>Facebook</span>
        </p>
      </div>
    </section>
  );
}
