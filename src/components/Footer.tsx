"use client";

function Footer() {
  return (
    <div
      id="footer"
      className="bg-[#232323] p-3 flex py-5 flex-col md:flex-row gap-3 items-center justify-around"
    >
      <div className="flex justify-center items-center gap-2">
        <img src="logo.png" alt="logo" className="h-8" />
        <h1 className=" text-xl text-center text-[#8082FD]">PropMaster AI</h1>
      </div>
      <p className="flex text-gray-400 flex-wrap sm:gap-3 justify-center items-center text-sm">©2026 PrepMaaster AI. <span> All rights reserved.</span></p>
    </div>
  );
}

export default Footer;
