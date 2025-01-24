"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function StudentNavbar() {
  const path = usePathname();
  const router = useRouter();

  return (
    <nav className="px-2 md:px-4 lg:px-8 py-3 border-b-2 border-zinc-400 flex justify-between items-center">
      <div className="font-bold">AIMS</div>
      <div>
        <Link
          href="/home/student"
          className={`${
            path === "/home/student" && "bg-zinc-900 text-white font-semibold"
          } mx-1 py-1 px-1 sm:px-4 rounded-md hover:border-[1px] hover:border-zinc-600 transition-all`}
        >
          Home
        </Link>
        <Link
          href="/home/student/courses"
          className={`${
            path === "/home/student/courses" &&
            "bg-zinc-900 text-white font-semibold"
          } mx-1 py-1 px-1 sm:px-4 rounded-md hover:border-[1px] hover:border-zinc-600 transition-all`}
        >
          Available Courses
        </Link>

        <button
          className="ms-1 py-1 px-4 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all"
          onClick={async () => {
            await axios.post(
              "http://localhost:4000/logout",
              {},
              { withCredentials: true }
            );

            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
