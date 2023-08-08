"use client";

import { Loader } from "../component/loader";
import { useAuth } from "../context/authService";


export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  return (
    <>
 
        <div className="flex justify-around signup md:mx-0 mx-auto min-h-screen items-center font-body">
          <main>{children}</main>
        </div>
    </>
  );
}
