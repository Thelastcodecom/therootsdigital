"use client";
import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface SidebarProps {
  allArticles: BlogPost[];
  selectedCategory: string | null;
  handleSearch: (term: string) => void;
  handleCategorySelect: (cat: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  allArticles,
  selectedCategory,
  handleSearch,
  handleCategorySelect,
}) => {
  const recent = allArticles
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const categoryCounts = allArticles.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <aside className="min-h-[200vh] p-8  border-gray-800 bg-transparent block lg:block sticky top-0">
      {/* SEARCH */}
      <div className="mb-12 border-l-1 border-b-1 border-t-1 border-r-0 border-[#242424] p-6">
        <h3 className="text-2xl font-marcellus font-bold text-white mb-4">
          Search Articles
        </h3>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-black border border-gray-700 text-sm p-3 text-gray-300 rounded-lg"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* RECENT POSTS */}
      <div className="mb-12 border-l-1 border-b-1 border-t-1 border-r-0 border-[#242424] p-6">
        <h3 className="text-2xl font-marcellus font-bold text-white mb-4">
          Recent Posts
        </h3>

        <div className="space-y-6">
          {recent.map((p, i) => (
            <div key={i} className="flex space-x-4">
              <img
                src={p.imageUrl}
                alt="image"
                className="w-20 h-20 rounded-md object-cover"
              />

              <div>
                <p className="text-xs text-lime-400 mb-1 font-outfit">
                  {new Date(p.date).toLocaleDateString()}
                </p>
                
                  <p className="text-base text-white font-marcellus font-semibold">
                    {p.title}
                  </p>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent comments*/}
      <div className="space-y-6 border-l-1 border-b-1 border-t-1 border-r-0 border-[#242424] p-6 mb-12">
        <h3 className="text-2xl font-marcellus font-bold text-white mb-4">
          Recent Comments
        </h3>
        <div className="text-base text-white font-marcellus font-semibold">
          no comments yet
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="border-l-1 border-b-1 border-t-1 border-r-0 border-[#242424] p-6">
        <h3 className="text-2xl font-marcellus font-bold text-white mb-4">
          Categories
        </h3>

        <ul className="space-y-3 text-sm font-outfit">
          <li
            className={`cursor-pointer ${
              selectedCategory === null ? "text-lime-400" : "text-gray-400"
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            All Articles ({allArticles.length})
          </li>

          {Object.entries(categoryCounts).map(([cat, count]) => (
            <li
              key={cat}
              className={`cursor-pointer ${
                selectedCategory === cat ? "text-lime-400" : "text-gray-400"
              }`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat} ({count})
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
