import BlogClient from "./BlogClient";
import { getPublishedPosts } from "@/lib/posts";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function BlogPage() {
  const posts = await getPublishedPosts().catch(() => []);
  return <BlogClient initialPosts={serialize(posts)} />;
}
