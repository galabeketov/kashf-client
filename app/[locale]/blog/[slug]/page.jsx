import BlogDetailClient from "./BlogDetailClient";
import { getPostById } from "@/lib/posts";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPostById(slug).catch(() => null);

  return <BlogDetailClient initialPost={post ? serialize(post) : null} />;
}
