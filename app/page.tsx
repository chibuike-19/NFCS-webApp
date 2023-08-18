"use client";

import Image from "next/image";
import Link from "next/link";
import CoverImg from "../public/imgs/cover-bg.png";
import Carousel from "./component/carousel";

export default function Home() {
  // customInitApp();

  // await grantModerator();

  const images = [
    { bgImg: "bg-corouselBg", text: "Come Worship with us" },
    { bgImg: "bg-coverBg", text: "Thank You" },
    { bgImg: "bg-corouselBg", text: "Good One" },
  ];

  return (
    <main className="flex min-h-screen bg-[#e8e7e780] flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-red-500">Welcome!</h1>
        <div className="w-[98.9vw]">
          <Carousel images={images} />
        </div>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </main>
  );
}
