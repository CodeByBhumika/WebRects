import { useEffect, useState } from "react";
import supabase from "../../Supabase";
import { Link } from "react-router-dom";

export default function Post({
  post,
  currentUser,
}: {
  post: any;
  currentUser: any;
}) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Fetch likes count + check if current user liked
  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from("likes")
        .select("user_id")
        .eq("post_id", post.id);

      if (error) {
        console.error("Error fetching likes:", error.message);
        return;
      }

      setLikesCount(data?.length || 0);

      if (currentUser) {
        setLiked(data?.some((l) => l.user_id === currentUser.id) || false);
      }
    };

    fetchLikes();
  }, [post.id, currentUser]);

  // Handle Like
  const handleLike = async () => {
    if (!currentUser) {
      alert("Please login to like posts.");
      return;
    }
    if (liked) {
      alert("You already liked this post.");
      return;
    }

    const { error } = await supabase
      .from("likes")
      .insert([{ post_id: post.id, user_id: currentUser.id }]);

    if (!error) {
      setLiked(true);
      setLikesCount((c) => c + 1);
    } else {
      console.error("Error liking post:", error.message);
      alert("Error liking post.");
    }
  };

  // Check if user is the author
  const isAuthor =
    currentUser &&
    (currentUser.email === post.author || currentUser.id === post.author_id);

  return (
    <div className="p-4 bg-white border shadow-md rounded-xl">
      {/* Title */}
      <Link
        to={`/post/${post.id}`}
        className="text-2xl font-bold text-[#00A7A7] hover:underline"
      >
        {post.title}
      </Link>

      {/* Content */}
      <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="object-cover mt-2 rounded-lg max-h-64"
        />
      )}

      {/* Author + Time */}
      <p className="mt-2 text-sm text-gray-500">
        By {post.author} • {new Date(post.created_at).toLocaleString()}
      </p>

      {/* Like + Author actions */}
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={handleLike}
          disabled={!currentUser || liked}
          className={`px-3 py-1 rounded border ${
            liked
              ? "bg-[#00A7A7] text-[#F0E9CC] cursor-not-allowed"
              : "bg-[#F0E9CC] text-[#00A7A7] hover:bg-[#00A7A7]/20"
          }`}
        >
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>

        {isAuthor && (
          <>
            <Link
              to={`/edit/${post.id}`}
              className="px-3 py-1 text-sm text-black bg-yellow-400 rounded"
            >
              Edit
            </Link>
            <button
              onClick={async () => {
                if (window.confirm("Delete this post?")) {
                  await supabase.from("blogs").delete().eq("id", post.id);
                  window.location.reload();
                }
              }}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}