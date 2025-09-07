import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../Supabase";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("blogs")
      .update({ title, content })
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    } else {
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0E9CC]">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-[#00A7A7]">
          Edit Post
        </h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="h-40 p-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00A7A7]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white rounded-lg bg-[#00A7A7] hover:bg-[#008787] transition-all"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
