import React from "react";
import "./userCardLoadingSkeleton.css";
function UserCardLoadingSkeleton() {
  return (
    <div>
      <article className="bg-white border-2 border-gray-100 rounded-xl">
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <div className="block shrink-0 animate-pulse">
            <div className="bg-gray-300 rounded-lg w-14 h-14"></div>
          </div>

          <div className="flex-1">
            <div className="h-5 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-20 mb-4 bg-gray-300 rounded-md animate-pulse"></div>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <div className="hidden bg-gray-300 rounded-md sm:block sm:h-4 sm:w-28 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <strong className="flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></span>
          </strong>
        </div>
      </article>
      ;
    </div>
  );
}

export default UserCardLoadingSkeleton;
