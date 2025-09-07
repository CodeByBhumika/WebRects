import image from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="p-6 mt-10 bg-[#00A7A7] text-[#F0E9CC]">
      <div className="flex flex-col gap-6 pb-6 md:flex-row">
        <section className="flex items-center justify-center w-full p-6 md:w-1/4 md:justify-start">
          <img src={image} alt="Logo" className="object-contain h-40" />
        </section>
        <section className="w-full p-6 md:w-1/4">
          <h2 className="mb-2 text-xl font-semibold text-[#F0E9CC]">About</h2>
          <p className="text-sm text-[#F0E9CC]/90">
            This is a simple blog app built with React and Tailwind CSS. Stay
            tuned for more content and updates.
          </p>
        </section>
        <section className="w-full p-6 md:w-1/4">
          <h2 className="mb-2 text-xl font-semibold text-[#F0E9CC]">
            Quick Links
          </h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#222] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#222] transition"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#222] transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-[#222] transition"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </section>
        <section className="w-full p-6 md:w-1/4">
          <h2 className="mb-2 text-xl font-semibold text-[#F0E9CC]">
            Follow Us
          </h2>
          <div className="flex justify-center md:justify-start gap-4 text-2xl text-[#F0E9CC]">
            <i className="fab fa-facebook cursor-pointer hover:text-[#222] transition"></i>
            <i className="fab fa-instagram cursor-pointer hover:text-[#222] transition"></i>
            <i className="fab fa-twitter cursor-pointer hover:text-[#222] transition"></i>
            <i className="fab fa-linkedin cursor-pointer hover:text-[#222] transition"></i>
          </div>
        </section>
      </div>
      <div className="pt-4 mt-6 text-sm text-center border-t border-[#F0E9CC]/30">
        React builds the web, hacking secures it—true mastery lies in knowing
        both.
      </div>
    </footer>
  );
}
