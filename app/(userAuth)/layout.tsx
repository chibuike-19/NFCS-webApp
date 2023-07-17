'use client'

import Login from "./login/page";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Register from "./register/page";
import Logo from '../../public/logo.png'

export default function RegistrationLayout() {
    const router = usePathname()
    // console.log(router)
    return (
      <div className="flex justify-around signup md:mx-0 mx-auto min-h-screen items-center">
        <main>{router == "/login" ? <Login /> : <Register />}</main>
        <div>
          {/* <Image src={Logo} alt="Nfcs Logo" /> */}
        </div>
      </div>
    );
}