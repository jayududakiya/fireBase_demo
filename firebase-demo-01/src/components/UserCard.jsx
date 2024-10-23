import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase-config";

const handleEdit = async (id, age) => {
  const userDoc = await doc(db, "users", id);
  const newAge = age + 1;
  await updateDoc(userDoc, { age: newAge });
};

const handleDelete = async (id) => {
  const userDoc = await doc(db, "users", id);
  await deleteDoc(userDoc);
};

function UserCard({ user }) {
  return (
    <article className="my-2 bg-white border-2 border-gray-100 rounded-xl">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <a href=".." className="block shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            className="object-cover rounded-lg size-14"
          />
        </a>

        <div>
          <h3 className="font-medium sm:text-lg">{user.username}</h3>

          <p className="text-sm text-gray-700 line-clamp-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
            accusantium temporibus iure delectus ut totam natus nesciunt ex?
            Ducimus, enim.
          </p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <p>Age : {user.age}</p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
              Email :
              <a
                href=".."
                className="font-medium underline hover:text-gray-700"
              >
                {user.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-1.5">
        <span className="inline-flex overflow-hidden bg-white border rounded-md shadow-sm">
          <button
            onClick={() => {
              handleEdit(user.id, user.age);
            }}
            className="inline-block p-3 text-gray-700 border-e hover:bg-gray-50 focus:relative"
            title="Edit Product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          <button
            onClick={() => handleDelete(user.id)}
            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
            title="Delete Product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </span>
      </div>
      <div className="flex justify-end">
        <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
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

          <span className="text-[10px] font-medium sm:text-xs">Solved!</span>
        </strong>
      </div>
    </article>
  );
}

export default UserCard;
