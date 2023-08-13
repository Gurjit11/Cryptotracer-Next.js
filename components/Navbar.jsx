"use client";

import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { UserAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  // console.log(user?.email)
  const [sidebar, setSidebar] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="m-1 w-full rounded-xl shadow-[0_5px_20px_5px_rgba(0,0,0,0.1)]  bg-white/60 backdrop-blur-sm p-1  fixed top-0 left-0  z-50 ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-2xl cursor-pointer ml-1">
              <Link href="/">CryptoTracer</Link>
            </h1>
          </div>

          {user?.email ? (
            <div>
              <div className="hidden md:block">
                <button className="text-black font-bold mx-1 mr-2 p-1 hover:scale-105">
                  <Link href="/account">Account</Link>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white bg-black font-semibold mx-1 p-2 rounded-3xl px-3 hover:scale-105"
                >
                  SignOut
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:block">
              <button className="text-black font-bold mx-1 mr-2 hover:scale-105">
                <Link href="/signup">Sign Up</Link>
              </button>
              <button className="text-white bg-black font-semibold mx-1 p-2 rounded-3xl px-3 hover:scale-105">
                <Link href="/signin">Sign In</Link>
              </button>
            </div>
          )}
          <div
            onClick={() => setSidebar(!sidebar)}
            className="text-xl rounded-full drop-shadow-lg shadow-2xl bg-white p-2 cursor-pointer md:hidden"
          >
            {sidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
      </div>
      {/* sidebar */}
      <div
        className={
          sidebar
            ? "md:hidden fixed left-0 top-10 flex flex-col items-center justify-between w-full h-[95%] bg-white ease-in duration-300 z-10 p-4"
            : "fixed left-[-100%] top-10 flex flex-col h-[95%] items-center justify-between ease-in duration-300 z-10"
        }
      >
        <ul className="w-full">
          <li className="font-bold my-2 py-2  px-3 drop-shadow-md shadow-md ">
            <h1 className="hover:scale-105 w-min">
              <Link onClick={() => setSidebar(false)} href="/">
                Home
              </Link>
            </h1>
          </li>
          <li className="font-bold my-2 py-2 px-3 drop-shadow-md shadow-md">
            <h1
              className="hover:scale-105 w-min"
              onClick={() => setSidebar(false)}
            >
              {user?.email ? (
                <Link href="/account">Account</Link>
              ) : (
                <Link href="/">Account</Link>
              )}
            </h1>
          </li>
        </ul>
        <div className="w-full">
          {user?.email ? (
            <div>
              <div className="flex flex-col mb-6 w-full border-b">
                <button
                  onClick={handleLogout}
                  className="text-white bg-black font-semibold  p-2 rounded-md drop-shadow-lg shadow-2xl hover:scale-105 hover:ease-in hover:duration-300"
                >
                  SignOut
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col my-3 w-full border-b ">
              <button className="text-black font-bold bg-white p-2 drop-shadow-lg shadow-2xl my-3 rounded-md hover:scale-105 hover:ease-in hover:duration-300">
                <Link onClick={() => setSidebar(false)} href="/signup">
                  Sign Up
                </Link>
              </button>
              <button className="text-white bg-black font-semibold p-2 rounded-md drop-shadow-lg shadow-2xl hover:scale-105 hover:ease-in hover:duration-300">
                <Link onClick={() => setSidebar(false)} href="/signin">
                  Sign In
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
