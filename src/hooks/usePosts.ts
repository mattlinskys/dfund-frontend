import { useState } from "react";
import { Post } from "types/post";

const usePosts = (slug: string) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  return { fetchPosts: () => {}, posts };
};

export default usePosts;
