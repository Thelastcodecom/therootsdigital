import { useState } from "react";

export default function CommentSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl border border-l-0 border-[#242424] rounded-lg p-8 md:p-12">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
          LEAVE A COMMENT
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          All fields marked with an asterisk (*) are required
        </p>

        {/* Form */}
        <div className="space-y-8">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 text-sm mb-3"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-700 focus:border-lime-400 outline-none py-2 text-white transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm mb-3"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-700 focus:border-lime-400 outline-none py-2 text-white transition-colors"
              />
            </div>
          </div>

          {/* Website Field */}
          <div>
            <label
              htmlFor="website"
              className="block text-gray-300 text-sm mb-3"
            >
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-700 focus:border-lime-400 outline-none py-2 text-white transition-colors"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="mt-1 w-4 h-4 bg-transparent border border-gray-600 rounded accent-lime-400 cursor-pointer"
            />
            <label
              htmlFor="saveInfo"
              className="text-gray-300 text-sm cursor-pointer"
            >
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          {/* Comment Field */}
          <div>
            <label
              htmlFor="comment"
              className="block text-gray-300 text-sm mb-3"
            >
              Your Comment*
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-transparent border-b border-gray-700 focus:border-lime-400 outline-none py-2 text-white resize-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="bg-lime-400 text-black px-12 py-4 font-semibold text-sm tracking-wider hover:bg-lime-500 transition-colors"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
