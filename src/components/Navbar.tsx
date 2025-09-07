import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Supabase from "../../Supabase";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
    const { data: listener } = Supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await Supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-[#00A7A7] text-[#F0E9CC] px-4 py-3 shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded" />
          <Link to="/" className="text-xl font-bold">
            WebRects
          </Link>
        </div>
        {/* Desktop Menu */}
        <ul className="items-center hidden gap-2 md:flex lg:gap-4">
          <li>
            <Link
              to="/"
              className="px-4 py-2 hover:text-[#ffda07] rounded transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="px-4 py-2 hover:text-[#ffda07] rounded transition"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 hover:text-[#ffda07] rounded transition"
            >
              Contact
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/blog"
                className="px-4 py-2 hover:text-[#ffda07] rounded transition"
              >
                Create Blog
              </Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 hover:text-[#ffda07] rounded transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 hover:text-[#ffda07] rounded transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link
                  to="/profile"
                  className="px-4 py-2 hover:text-[#ffda07] rounded transition flex items-center gap-2"
                >
                  <span className="w-7 h-7 rounded-full bg-[#F0E9CC] text-[#00A7A7] flex items-center justify-center font-bold">
                    {user.user_metadata?.full_name
                      ? user.user_metadata.full_name[0].toUpperCase()
                      : user.email[0].toUpperCase()}
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:text-[#ffda07] rounded transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="p-2 rounded-full hover:bg-[#F0E9CC]/20 transition"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Show search"
            >
              <FiSearch className="text-2xl text-[#F0E9CC]" />
            </button>
          </li>
        </ul>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="block w-7 h-1 bg-[#F0E9CC] rounded"></span>
          <span className="block w-7 h-1 bg-[#F0E9CC] rounded"></span>
          <span className="block w-7 h-1 bg-[#F0E9CC] rounded"></span>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="flex flex-col md:hidden bg-[#00A7A7] mt-2 rounded shadow z-20">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/blog"
                className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                Create Blog
              </Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link
                  to="/profile"
                  className="px-4 py-2 hover:text-[#ffda07] rounded transition flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="w-7 h-7 rounded-full bg-[#F0E9CC] text-[#00A7A7] flex items-center justify-center font-bold">
                    {user.user_metadata?.full_name
                      ? user.user_metadata.full_name[0].toUpperCase()
                      : user.email[0].toUpperCase()}
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 hover:text-[#ffda07] rounded transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li>
            <button
              className="p-2 rounded-full hover:bg-[#F0E9CC]/20 transition"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Show search"
            >
              <FiSearch className="text-2xl text-[#F0E9CC]" />
            </button>
          </li>
        </ul>
      )}
      {/* Search Bar (overlay for both desktop and mobile) */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40"
          onClick={() => setShowSearch(false)}
        >
          <form
            onSubmit={handleSearch}
            className="mt-24 bg-[#F0E9CC] flex items-center rounded shadow-lg px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 md:w-96 px-2 py-1 rounded-l bg-[#F0E9CC] text-[#00A7A7] focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#00A7A7] text-[#F0E9CC] rounded-r hover:bg-[#008b8b] transition"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
