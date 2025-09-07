import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Supabase from "../../Supabase";
import { useBlog } from "../pages/blogContext.tsx";

export default function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  const { setBlogs } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await Supabase.auth.getUser();
      if (user) {
        setAuthor(user.user_metadata?.full_name || user.email || "");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    setLoading(true);

    const { data, error } = await Supabase.from("blogs")
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          tags: tags.trim(),
          author,
          likes: 0,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    } else if (data) {
      setBlogs((prev: any[]) => [data, ...prev]);
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0E9CC] p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border-t-8 border-[#00A7A7]">
        <h1 className="text-3xl font-bold text-center text-[#00A7A7] mb-6">
          Write a Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content..."
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[#00A7A7] font-medium mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Comma separated tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00A7A7] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#008B8B] transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
}