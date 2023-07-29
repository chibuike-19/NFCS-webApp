"use client";
import { useRouter } from "next/navigation";
import { auth } from "../context/firebase";
import { useAuth } from "../context/authService";
import { Loader } from "./loader";
import { useEffect } from "react";

function ProtectedRoute(Component: any) {
  return function WithProtected(props: any) {
    const router = useRouter();

    // const { user } = useAuth();
    // checks for authentication of currentUser
    useEffect(() => {
      if (!auth?.currentUser) {
        router.replace("/login");

        // displays while redirecting is occuring, could be replaced with a loader component
      }
      // redirects user to login page if not yet authenticated
      // return <Loader />;
    }, [auth.currentUser]);
    return <Component />;
  };
}

export default ProtectedRoute;
