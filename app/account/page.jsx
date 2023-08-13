"use client";

import { useRouter } from "next/navigation";
import SavedCoin from "@/components/SavedCoin";
import { UserAuth } from "@/contexts/AuthContext";

const Account = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err.message);
    }
  };
  if (!user) {
    router.push("/signin");
  } else {
    return (
      <>
        <div className="md:m-8 relative pt-9">
          <div className="bg-red-400 absolute text-white mt-24 px-3  right-[-45px] rotate-90">
            <span className="">Client Side</span>
          </div>
          <div className="bg-white rounded-xl shadow-2xl sm:m-2 p-3">
            <h1 className="font-bold text-xl m-2">Account</h1>
            <div className="flex flex-col md:flex-row justify-between mx-2 md:items-center items-start">
              <div className="mb-2">
                Welcome,{" "}
                <span className="font-bold text-xl ">{user?.email}</span>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  className="text-indigo-500 sm:hover:scale-105 font-bold border-2 rounded-2xl p-1 px-3 border-indigo-400 outline-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl m-2 sm:p-3 py-3">
            <div className="m-2">
              <h1 className="font-bold text-xl mb-2">Watch List</h1>
              <SavedCoin />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Account;
