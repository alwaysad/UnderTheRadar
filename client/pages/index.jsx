import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { Configuration, OpenAIApi } from "openai";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import Explore from "../components/ExploreComponent";
const HomePage = () => {
  return (
    <div className="mb-4">
      <Head>
        <title>Welcome to Under The Radar</title>
      </Head>
      <Banner />
      <Explore />
    </div>
  );
};

export default HomePage;
