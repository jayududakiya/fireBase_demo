import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { db } from "./firebase-config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import UserCardLoadingSkeleton from "./LoadingSkeleton/UserCardLoadingSkeleton";

function App() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const usesCollectionRef = collection(db, "users");

  const handleCreateUser = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission
      let user = {};
      // Get form data
      const username = event.target.username.value;
      const email = event.target.email.value;
      const age = event.target.age.value;
      user = {
        username,
        email,
        age: Number(age)
      };

      const responseData = await addDoc(usesCollectionRef, user);
      console.log("responseData", responseData.id);
      event.target.reset();
      setError(null); // Clear any previous errors
    } catch (error) {
      console.log("➡ ~ handleCreateUser ~ error:", error);
      setError(error);
    }
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const data = await getDocs(usesCollectionRef);
  //       const responseData = data.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         };
  //       });
  //       console.log("fetch data");
  //       setUsers(responseData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      usesCollectionRef,
      (snapshot) => {
        const responseData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched data in real-time");
        setTimeout(() => {
          setLoading(false); // No longer needed in finally
          setUsers(responseData);
        }, 2000);
      },
      (error) => {
        setError(error);
        setLoading(false); // Handle error scenario
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1 className="uppercase"> fire base demo Project</h1>
      <div>
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Create User</h1>
          </div>

          <form
            onSubmit={handleCreateUser}
            className="max-w-md mx-auto mt-8 mb-0 space-y-4"
          >
            <div>
              <label htmlFor="userName" className="sr-only">
                userName
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter userName"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="Age" className="sr-only">
                Age
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="age"
                  autoComplete="off"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter Age"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container w-[90%]  mx-auto">
        {loading ? (
          <UserCardLoadingSkeleton />
        ) : (
          users && users.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}

export default App;
