import img from "../assets/img.jpg";

export default function SideBar() {
  return (
    <aside className="w-full md:w-1/4 flex flex-col gap-6 p-6 bg-[#F0E9CC] rounded-lg shadow-md">
      <span className="block p-1 text-center border-[#00A7A7] border-y-2 text-[#00A7A7] font-semibold tracking-wide">
        ABOUT US
      </span>
      <img
        src={img}
        alt="About"
        className="object-cover w-full rounded-md h-70"
      />
      <p className="text-center text-[#222]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolor
        at temporibus!
      </p>
      <span className="block p-1 text-center border-[#00A7A7] border-y-2 text-[#00A7A7] font-semibold tracking-wide">
        CATEGORIES
      </span>
      <ul className="grid grid-cols-2 gap-3 px-4 text-[#00A7A7] font-medium">
        <li>Life</li>
        <li>Music</li>
        <li>Sport</li>
        <li>Style</li>
        <li>Tech</li>
        <li>Cinema</li>
      </ul>
      <span className="block p-1 text-center border-[#00A7A7] border-y-2 text-[#00A7A7] font-semibold tracking-wide">
        FOLLOW US
      </span>
      <div className="flex justify-center gap-4 text-[#00A7A7] text-2xl">
        <i className="fa-brands fa-square-facebook cursor-pointer hover:text-[#007b7b] transition"></i>
        <i className="fa-brands fa-square-instagram cursor-pointer hover:text-[#007b7b] transition"></i>
        <i className="fa-brands fa-square-linkedin cursor-pointer hover:text-[#007b7b] transition"></i>
        <i className="fa-brands fa-square-twitter cursor-pointer hover:text-[#007b7b] transition"></i>
      </div>
    </aside>
  );
}