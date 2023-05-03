import Image from "next/image";
import { useState, useEffect } from "react";

const Banner = () => {
  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <Image src="/resized.png" alt="banner" width={1600} height={800} />
      </div>
      <Image src="/resized.png" alt="banner" width={1600} height={800} />
      <div className=" hidden lg:block absolute  top-32 left-20 space-y-4">
        <p className="text-7xl text-black font-bold">UNDER THE RADAR</p>
        <p className="text-3xl max-w-lg font-bold ">
          UnderTheRadar is an app that helps you discover hidden gems in popular
          tourist destinations. Find undiscovered coffee shops, restaurants, art
          galleries, and more to experience the destination like a local
        </p>
      </div>
    </div>
  );
};

export default Banner;
