"use client";

import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface Props extends BlogPost {}

const BlogCard: React.FC<Props> = ({
  title,
  content,
  imageUrl,
  date,
  category,
  slug,
}) => {
  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className=" flex flex-col p-6 lg:p-10 border-b-1 border-l-0 border-t-1 border-r-1 border-[#242424] bg-black mb-10">
      {/* IMAGE */}
      <div className="flex-shrink-0 mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg shadow-xl border border-lime-400/20">
        <img src={imageUrl} alt={slug} className="w-full h-full object-cover" />
      </div>

      {/* META */}
      <div className="flex justify-between items-center mb-8 font-outfit uppercase">
        <span className="flex items-center text-xs text-gray-400">
          <span className="text-lime-400 mr-1">👤</span> The Roots Digital
        </span>

        <span className="flex items-center text-xs text-gray-400">
          <span className="text-lime-400 mr-1">💬</span> Comments (0)
        </span>

        <span className="flex items-center text-xs text-gray-400">
          <span className="text-lime-400 mr-1">📅</span> {formatDate(date)}
        </span>
      </div>

      {/* TITLE */}
      <Link
        href={`/blog/${slug}`}
        className="flex items-center space-x-4 group"
      >
        <h2 className="text-2xl lg:text-3xl font-marcellus uppercase text-white mb-6 leading-tight cursor-pointer group relative hover:underline transition-all duration-300 ease-out">
          {title}
        </h2>
      </Link>

      {/* EXCERPT */}
      <p className="text-gray-400 mb-8 text-lg font-outfit flex-grow">
        {content.split(" ").slice(0, 50).join(" ")}
      </p>

      {/* READ MORE */}
      <div className="mt-auto">
        <Link
          href={`/blog/${slug.toLowerCase().replace(/ /g, "-")}`}
          className="flex items-center space-x-4 group"
        >
          <p className="uppercase text-lg font-bold tracking-widest text-lime-400 font-outfit">
            READ MORE
          </p>
          <div className="text-black font-extrabold w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            →
          </div>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
