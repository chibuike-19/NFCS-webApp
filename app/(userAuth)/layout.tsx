"use client";

import Login from "./login/page";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Register from "./register/page";
import { Loader } from "../component/loader";
import { useAuth } from "../context/authService";
import Logo from "../../public/logo.png";
import ForgetPassword from "./forgetPassword/page";

export default function RegistrationLayout({children}: any) {
  const router = usePathname();
  const { loading } = useAuth();

  let renderComponent: React.ReactNode;
  switch (router) {
    case "/login":
      renderComponent = <Login />;
      break;
    case "/forgetPassword":
      renderComponent = <ForgetPassword />;
      break;
    default:
      renderComponent = <Register />;
  }

  return (
    <>
      {loading ? (
        <div className="flex h-[90vh] justify-center items-center">
          <Loader />
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
