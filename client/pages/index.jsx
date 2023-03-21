import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Under The Radar</title>
      </Head>
      <Banner />
      <div className="flex justify-center items-center my-5 ">
        <p className="text-4xl font-bold ">Explore</p>
      </div>
      <div className="flex container mx-auto justify-center items-center flex-col space-y-4 md:flex-row md:space-x-4  md:space-y-0 mt-4">
        <Link href="/business/Art Shop">
          <div className="relative object-cover group hover:cursor-pointer">
            <div className="absolute top-6 left-6 text-white">
              <p className=" text-xl w-40">Discover the Art</p>
              <span className="font-bold text-2xl ">Art Galleries</span>
            </div>
            <Image
              alt="Art Gallery"
              src="/artgallery.png"
              width={500}
              height={500}
            ></Image>
          </div>
        </Link>

        <Link href="/business/Accomadation">
          <div className=" relative object-cover group hover:cursor-pointer">
            <div className="absolute top-6 left-6 text-white">
              <p className=" text-xl w-40">Find your place</p>
              <span className="font-bold text-2xl ">Hotels&Hostels</span>
            </div>
            <Image
              alt="Hotel"
              src="/hotel.jpg"
              width={500}
              height={500}
            ></Image>
          </div>
        </Link>

       
          <Link href="/business/Restaurant">
            <div className="relative object-cover group hover:cursor-pointer">
              <div className="absolute top-6 left-6 text-white">
                {/* <p className="absolute top-10 left-10 text-white text-xl w-48">Explore local food<span className="font-bold text-2xl">Restaurants</span></p> */}
                <p className=" text-xl w-40">Explore local food</p>
                <span className="font-bold text-2xl ">Restaurants</span>
              </div>
              <Image
                alt="Restaurant"
                src="/restaurant.jpg"
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        
       
          <Link href="/business/Cultural Place">
            <div className="relative object-cover group hover:cursor-pointer">
              <div className="absolute top-6 left-6 text-white">
                {/* <p className="absolute top-10 left-10 text-white text-xl w-48">Explore local food<span className="font-bold text-2xl">Restaurants</span></p> */}
                <p className=" text-xl w-44">Discover the history</p>
                <span className="font-bold text-2xl ">Cultural activities</span>
              </div>
              <Image
                alt="Cultural places"
                src="/culturalplace.jpg"
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        </div>
      
    </div>
  );
};

export default HomePage;
