export default function Navbar() {
  return (
    <nav className="bg-white text-black rounded-[100px] border border-black-400 p-[3px] mx-auto my-6 w-[1082px] h-66px mt-[21px] grid gap-[60px]">
      <div className="flex justify-end space-x-7 items-center">
        <div className="flex space-x-15 mx-auto text-xs p-[10px] h-[38px] w-[333px]">
          <a href="#home" className="relative font-medium hover:text-gray-700">
            Home
            {/* Triangle under active link */}
            <span className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 text-xs">
              ▲
            </span>
          </a>
          <a href="#work" className="font-medium hover:text-gray-700">
            Work
          </a>
          <a href="#about" className="font-medium hover:text-gray-700">
            About
          </a>
          <a href="#play" className="font-medium hover:text-gray-700">
            Play
          </a>
        </div>

        <a
          href="#followme"
          className="bg-black text-sm text-white px-[21px] py-[10px] m-0 rounded-tr-[50px] rounded-br-[50px] font-medium hover:bg-gray-800 transition-colors"
        >
          Follow me
        </a>
      </div>
    </nav>
  );
}
