import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0E9CC]">
      <h1 className="text-6xl font-bold text-[#00A7A7] mb-4">404</h1>
      <p className="text-xl text-[#00A7A7] mb-8">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#00A7A7] text-[#F0E9CC] rounded hover:bg-[#008b8b] transition"
      >
        Go Home
      </Link>
    </div>
  );
}