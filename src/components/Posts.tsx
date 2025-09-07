import { useEffect, useState } from "react";
import supabase from "../../Supabase";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    };

    fetchPosts();
    fetchUser();
  }, []);

  if (loading) return <p className="text-center">Loading posts...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">All Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Post key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}
