"use client";

import Image from "next/image";
import Link from "next/link";
import CoverImg from "../public/imgs/cover-bg.png";
import Carousel from "./component/carousel";
import LandingPageHeader from "./component/LandingPageHeader";
import Footer from "./component/Footer";

export default function Home() {
  // customInitApp();

  // await grantModerator();

  const images = [
    { bgImg: "bg-corouselBg", text: "Come Worship with us" },
    { bgImg: "bg-coverBg", text: "Thank You" },
    { bgImg: "bg-corouselBg", text: "Good One" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header>
        <LandingPageHeader />
      </header>
      <main className="flex flex-col items-center justify-between h-screen p-24">
        <div>
          <h1 className="text-red-600">Welcome!</h1>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
