import { Navbar } from "@/app/(containers)/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="m-auto h-full flex flex-col justify-center  max-w-[1440px]">
        <div className="flex justify-center ">
          <Image
            src="https://recruit-g.com/wp-content/uploads/2024/09/2-2.png"
            alt="camp"
            width={600}
            height={400}
          ></Image>
        </div>
        <div className="text-center flex flex-col gap-6">
          <h1 className="text-6xl font-[500] leading-[120%]">
            Ooops! Page Not Found
          </h1>
          <p className="text-base">
            Let's help you find what you are looking for
          </p>
          <Link href="/">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
