"use client";

import Login from "./login/page";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Register from "./register/page";
import { Loader } from "../component/loader";
import { useAuth } from "../context/authService";
import Logo from "../../public/logo.png";

export default function RegistrationLayout({children}: any) {
  const router = usePathname();
  const { loading } = useAuth();
  // console.log(router)
  return (
    <>
      {loading ? (
        <div className="flex h-[90vh] justify-center items-center">
          <Loader/>
        </div>
      ) : (
        <div className="flex justify-around signup md:mx-0 mx-auto min-h-screen items-center">
          <main>{children}</main>
          <div>{/* <Image src={Logo} alt="Nfcs Logo" /> */}</div>
        </div>
      )}
    </>
  );
}
