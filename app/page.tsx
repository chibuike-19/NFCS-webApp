"use client";

import Image from "next/image";
import Link from "next/link";
import { grantModerator } from "@/lib/admin-config";
import { customInitApp } from "@/lib/firebase-admin-config";
import { useAuth } from "./context/authService";
import { useEffect, useState } from "react";
import LandingPageHeader from "./component/LandingPageHeader";
import Footer from "./component/Footer";

export default function Home() {
  // customInitApp();

  // await grantModerator();

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
