"use client";
import { useRouter } from "next/navigation";
import { auth } from "../context/firebase";
import { useEffect } from "react";

function ProtectedRoute(Component: any) {
  return function WithProtected(props: any) {
    const router = useRouter();
    // checks for authentication of currentUser
    useEffect(() => {
      if (!auth?.currentUser) {
        // redirects user to login page if not yet authenticated
        router.replace("/login");
        // displays while redirecting is occuring, could be replaced with a loader component
      }
    }, [auth]);

    return <Component />;
  };
}

export default ProtectedRoute;
