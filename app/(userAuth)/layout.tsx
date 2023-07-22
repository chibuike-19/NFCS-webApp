"use client";

import { Loader } from "../component/loader";
import { useAuth } from "../context/authService";


export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

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
