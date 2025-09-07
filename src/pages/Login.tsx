import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Supabase from "../../Supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await Supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0E9CC]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#00A7A7]"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#00A7A7] text-center">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-[#00A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-[#00A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00A7A7] text-[#F0E9CC] font-semibold py-2 rounded hover:bg-[#008b8b] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
