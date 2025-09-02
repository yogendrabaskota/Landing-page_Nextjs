"use client";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const links = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Work", href: "#work", id: "work" },
    { name: "About", href: "#about", id: "about" },
    { name: "Play", href: "#play", id: "play" },
  ];

  return (
    <div className="bg-[#242424]">
      <nav className="bg-white text-black rounded-[100px] border border-black-400 p-[3px] mx-auto max-w-[1082px] h-[66px] mt-0 grid gap-[60px]">
        <div className="flex justify-end space-x-7 items-center">
          <div className="flex space-x-15 mx-auto text-sm text-[14px] p-[10px] h-[38px] w-[333px]">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="relative font-medium hover:text-gray-700"
                onClick={() => setActive(link.id)}
              >
                {link.name}

                {active === link.id && (
                  <span className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 text-sm">
                    ▲
                  </span>
                )}
              </a>
            ))}
          </div>

          <a
            href="#followme"
            className="bg-black text-sm text-white px-[21px] py-[10px] m-0 rounded-tr-[50px] h-[60px] rounded-br-[50px] font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            Follow me
          </a>
        </div>
      </nav>
    </div>
  );
}
