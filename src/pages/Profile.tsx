import { useEffect, useState } from "react";
import Supabase from "../../Supabase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0E9CC]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#00A7A7] flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#00A7A7] flex items-center justify-center text-4xl text-[#F0E9CC] font-bold mb-4">
          {user.user_metadata?.full_name
            ? user.user_metadata.full_name[0].toUpperCase()
            : user.email[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-[#00A7A7] mb-2">
          {user.user_metadata?.full_name || user.email}
        </h2>
        <p className="text-[#00A7A7] mb-2">{user.email}</p>
        <button
          className="mt-4 px-6 py-2 bg-[#00A7A7] text-[#F0E9CC] rounded hover:bg-[#008b8b] transition"
          onClick={async () => {
            await Supabase.auth.signOut();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
