"use client";

import { useRef, useState } from "react";
import { AiFillLock, AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/contexts/AuthContext";
import Particles from "@/components/Particles";

const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { logIn } = UserAuth();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formRef);
    try {
      await logIn(formRef.current[0].value, formRef.current[1].value);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Particles />
      <div className=" max-w-[400px] relative mx-auto min-h-[600px] px-4 py-20 shadow-2xl mt-16 rounded-2xl">
        <div className="bg-red-400 absolute text-white md:mt-24 px-3  right-[-45px] rotate-90">
          <span className="">Client Side</span>
        </div>
        <div className="mb-4 text-center font-bold text-2xl">SignIn</div>
        {error ? (
          <div className="flex w-full">
            <span className="bg-red-500 text-white p-3 my-2 flex items-center justify-between w-full text-slice">
              {error}
              <span>
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => setError("")}
                />
              </span>
            </span>
          </div>
        ) : null}
        <div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className=" w-full mb-3">
              <label>Email</label>
              <div className="relative w-full my-2 rounded-2xl shadow-xl">
                <input
                  name="email"
                  className="w-full bg-primary border border-input rounded-2xl p-2  outline-blue-400"
                  type="email"
                  placeholder="Enter your email..."
                />
                <AiOutlineMail className="absolute right-2 top-3 text-gray-500" />
              </div>
            </div>
            <div className=" w-full mb-3">
              <label>Password</label>
              <div className="relative w-full my-2 rounded-2xl shadow-xl">
                <input
                  name="password"
                  className="w-full bg-primary border border-input rounded-2xl p-2 outline-blue-400"
                  type="password"
                  placeholder="Enter your password..."
                />
                <AiFillLock className="absolute right-2 top-3 text-gray-500" />
              </div>
            </div>
            <button
              className="bg-blue-400 relative rounded-2xl w-full hover:border-blue-300 border-2 border-white text-white font-bold text-xl py-1 mt-4"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="text-gray-400 relative mt-4 text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-400" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
