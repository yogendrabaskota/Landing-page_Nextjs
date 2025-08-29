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
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-md">
          Want to <br /> collaborate??
        </h2>

        <div className="relative w-full md:w-1/2 text-center md:text-left">
          {/* <div className="absolute left-0 top-0 h-full border-l-2 border-white/50 border-dotted rounded-l-xl"></div> */}

          <div className="relative p-8">
            <h3 className="text-xl font-semibold">Let’s Connect</h3>
            <p className="text-gray-200 mt-2">
              Feel free to reach out for collaborations or just a friendly hello{" "}
              <span className="ml-2">👋</span>
            </p>

            <button className="mt-6 px-6 py-5 bg-black border border-gray-400 rounded-r-[50px] text-white hover:bg-white hover:text-black transition-all duration-300">
              Send an Email
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
