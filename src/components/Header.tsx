import headerImage from "../assets/headerImage.png";

export default function Header() {
  return (
    <header className="relative w-full">
      <img
        src={headerImage}
        alt=""
        className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover"
      />
      <section className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#00A7A7]/25">
        <h1 className="text-[#F0E9CC] text-xl font-semibold sm:text-2xl lg:text-5xl drop-shadow-md">
          WebRects
        </h1>
        <h1 className="text-[#F0E9CC] text-5xl font-bold sm:text-6xl lg:text-8xl drop-shadow-lg">
          BLOG
        </h1>
      </section>
    </header>
  );
}
