"use client";

import { FC } from "react";
import Image from "next/image";

const Details: FC = () => {
  return (
    <section className="relative min-h-screen bg-[#242424] text-white py-20">
      <div className=" text-center relative">
        <div className="w-full text-4xl sm:text-6xl font-light flex flex-col">
          <div className="w-full flex justify-start">
            <span>LESS DOUBT</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 mt-0">
            {/* <div className="w-90 border-t border-dotted border-gray-500 mt-6"></div> */}

            <Image
              src="/moon.png"
              alt="Moon"
              width={250}
              height={250}
              className="object-contain opacity-50"
            />
            {/* <div className="w-90 border-t border-dotted border-gray-500 mt-9"></div> */}
          </div>
          <div className="w-full flex justify-end">
            <span>MORE OUTPUT</span>
          </div>
        </div>

        <div className="relative z-10 mt-48 text-left ml-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            NAMASTE <span className="ml-2">🙏</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl mt-2 font-light">
            I&apos;M JOHN DOE
          </h3>
          <p className="text-gray-400 sm:text-base mt-4 text-xs">
            Tell about your intro and story
          </p>

          <div className="w-90 border-t border-dotted border-gray-500 mt-6"></div>
          <div className="w-72 border-t border-dotted border-gray-500 mt-6"></div>
        </div>

        <div className="relative z-10 mt-16 ml-6 text-left">
          <button className="inline-flex items-center gap-2 text-lg sm:text-xl hover:underline underline-offset-4">
            <span>Let’s know more</span>
            <svg
              className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 7l-10 10M17 7H7M17 7v10"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Details;
