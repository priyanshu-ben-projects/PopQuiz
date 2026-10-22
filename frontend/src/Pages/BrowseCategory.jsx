import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function BrowseCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((Response) => {
        setCategories(Response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="w-full  mx-auto p-4 sm:p-6 lg:p-8 bg-[#f3f2ef]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-gray-200 rounded-lg p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Category Title */}
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#0a66c2] transition-colors mb-2 tracking-tight">
                  {item.category}
                </h3>

                {/* About / Description */}
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                  {item.about}
                </p>
              </div>

              {/* Action Button Area */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0a66c2] hover:bg-blue-50 border border-transparent hover:border-[#0a66c2]/20 rounded-full transition-all"
                >
                  <span>Start Quiz</span>
                  <svg
                    className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
