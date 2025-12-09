import { blogPosts } from "./blogs";

export const getBlogBySlug = (slug: string) => {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(slug);
  
  console.log("Original slug:", slug);
  console.log("Decoded slug:", decodedSlug);
  console.log("Available blogs:", blogPosts.map(b => b.slug));
  
  const blog = blogPosts.find((b) => b.slug === decodedSlug);
  
  console.log("Found blog:", blog ? blog.title : "Not found");
  
  return blog;
};