"use client";

import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/footer.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/50"></div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-md z-10">
          Want to <br /> collaborate??
        </h2>

        <div className="relative w-full md:w-1/2 text-center md:text-left z-10">
          <div className="relative p-8">
            <div className="absolute left-0 right-0 top-0 h-px bg-white/50 "></div>

            <h3 className="text-xl font-semibold">Let’s Connect</h3>
            <p className="text-gray-200 mt-2">
              Feel free to reach out for collaborations or just a friendly hello{" "}
              <span className="ml-2">👋</span>
            </p>

            <button className="mt-6 px-6 py-5 bg-black border border-gray-400 rounded-r-[50px] text-white hover:bg-white hover:text-black transition-all duration-300">
              Send an Email
            </button>

            <div className="absolute left-0 right-0 bottom-0 h-px bg-white/50"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
