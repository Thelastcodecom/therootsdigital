import React from "react";
import { getBlogBySlug } from "@/lib/getBlogBySlug";
import SingleBlog from "@/components/blog/SingleBlog";

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog)
    return (
      <div className="text-center py-40 text-2xl font-semibold">
        Blog not found
      </div>
    );

  return <SingleBlog blog={blog} />;
}
