import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
const HomePage = () => {

  return (
    <div>
      <Banner />
      <div className="flex justify-center items-center my-5 ">
        <p className="text-4xl font-bold ">Explore</p>
      </div>
      <div className="flex justify-center items-center flex-col space-y-4 md:flex-row md:space-x-4  md:space-y-0 mt-4">
        <Link href="/business/Art Shop">
          <div className="object-cover group hover:cursor-pointer">
            <Image
              alt="Art Gallery"
              src="/artgal.png"
              width={500}
              height={500}
            ></Image>
          </div>
        </Link>
        <div>
          <Link href="/business/Accomadation">
            <div className="object-cover group hover:cursor-pointer">
              <Image
                alt="Hotel"
                src="/hotel.jpg"
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/business/Restaurant">
            <div className="object-cover group hover:cursor-pointer">
              <Image
                alt="Restaurant"
                src="/restaurant.jpg"
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        </div>
        <div>
          <Link href="/business/Cultural Place">
            <div className="object-cover group hover:cursor-pointer">
              <Image
                alt="Cultural places"
                src="/culture.jpg"
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
