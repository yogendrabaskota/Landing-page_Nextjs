import Image from "next/image";

export default function HomePage() {
  return (
    <section className="relative w-full h-screen bg-[#242424] text-white overflow-hidden mt-0 p-0 flex items-center justify-center">
      {/* Moon Image */}
      <div className="absolute right-0 top-0 h-full w-[50%]">
        <Image
          src="/moon.png"
          alt="Moon"
          layout="fill"
          objectFit="contain"
          className="opacity-90"
        />
      </div>

      {/* Text Content */}
      <div className="items-center justify-center w-[896px]">
        <div className="relative  grid  gap-[10px] opacity-100 w-[896px]]">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight py-[10px]">
            FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT.
          </h1>
          <div className="ml-10 w-[660px] h-[178px] grid gap-[30px] mt-10">
            <p className=" text-lg text-gray-300 opacity-100">
              Hi, I am <span className="font-bold">John Doe.</span> Welcome to
              my portfolio.
            </p>

            <button className="w-[149px] h-[60px] border rounded-tr-[50px] rounded-br-[50px] border-[#939393] hover:bg-white hover:text-black transition flex items-center justify-center px-[10px]">
              <span className="text-[14px]">Download resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
