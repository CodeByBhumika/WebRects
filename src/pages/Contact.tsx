import React, { useState } from "react";
import supabase from "../../Supabase"; // adjust path if needed

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error("Error inserting message:", error);
      setStatus("❌ Failed to send. Try again!");
    } else {
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0E9CC] p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border-t-8 border-[#00A7A7]">
        <h1 className="text-3xl font-bold text-center text-[#00A7A7] mb-6">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A7A7] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#008b8b] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center font-medium text-[#00A7A7]">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}