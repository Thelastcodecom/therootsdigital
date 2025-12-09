"use client";

import React from "react";
import BlogCard from "./BlogCard";
import Sidebar from "./Sidebar";
import PageHeading from "./PageHeading";
import { blogPosts } from "@/lib/blogs";

export default function BlogLayout() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCat = category ? post.category === category : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto  mt-40">
        <PageHeading />

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {filtered.length > 0 ? (
              filtered.map((post) => <BlogCard key={post.index} {...post} />)
            ) : (
              <div className="h-screen flex items-center justify-center text-gray-500">
                No articles found.
              </div>
            )}
          </div>

          <Sidebar
            allArticles={blogPosts}
            selectedCategory={category}
            handleSearch={setSearchTerm}
            handleCategorySelect={setCategory}
          />
        </div>
      </div>
    </div>
  );
}
