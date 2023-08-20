"use client";


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
      <main className="flex flex-col items-center justify-between">
        <div>
          <div className="w-[98.9vw]">
            <Carousel images={images} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
