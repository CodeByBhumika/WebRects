import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../../Supabase";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
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
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
      <p className="mb-4 text-gray-500">
        By {post.author} • {new Date(post.created_at).toLocaleString()}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full mb-4 rounded-xl"
        />
      )}
      <p className="mb-6 text-lg text-gray-800">{post.content}</p>

      <div className="flex gap-4">
        <Link
          to={`/edit/${post.id}`}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Edit
        </Link>
        <button
          onClick={async () => {
            const { error } = await supabase
              .from("blogs")
              .delete()
              .eq("id", post.id);
            if (error) {
              console.error("Error deleting:", error);
              alert("Failed to delete post.");
            } else {
              alert("Post deleted successfully!");
              navigate("/posts");
            }
          }}
          className="px-4 py-2 text-white bg-red-500 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
