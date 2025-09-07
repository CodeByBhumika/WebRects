import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Supabase from "../../Supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await Supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      alert(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0E9CC]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#00A7A7]"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#00A7A7] text-center">
          Register
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 p-3 border border-[#00A7A7] rounded focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
