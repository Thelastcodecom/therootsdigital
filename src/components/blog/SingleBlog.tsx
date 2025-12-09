"use client";
import { BlogPost } from "@/lib/types";
import CommentSection from "./CommentSection";

interface Props {
  blog: BlogPost;
}

const SingleBlog: React.FC<Props> = ({ blog }) => {
  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Category and Date */}
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="px-3 py-1 bg-lime-400 text-black rounded-full font-semibold">
              {blog.category}
            </span>
            <span>{formatDate(blog.date)}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Main Content - FULL ARTICLE */}
          <div className="prose prose-invert prose-lg max-w-none">
            {blog.content.split("\n\n").map((paragraph, idx) => {
              // Check if it's a heading
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-white"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              // Check if it's a subheading
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-xl md:text-2xl font-bold mt-8 mb-3 text-white"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              // Regular paragraph
              if (paragraph.trim()) {
                return (
                  <p
                    key={idx}
                    className="text-gray-300 leading-relaxed mb-6 text-lg"
                  >
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Back to Blog Link */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <a
              href="/blog"
              className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </a>
          </div>
        </div>
      </div>
      <div>
        <CommentSection />
      </div>
    </>
  );
};

export default SingleBlog;
