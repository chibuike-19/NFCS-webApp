"use client";
import { useRouter } from "next/navigation";
import { auth } from "../context/firebase";

function ProtectedRoute(Component: any) {
  
  return function WithProtected(props: any) {
    const router = useRouter();
    // checks for authentication of currentUser
    if (!auth?.currentUser) {
      // redirects user to login page if not yet authenticated
      router.replace("/login");
      // displays while redirecting is occuring, could be replaced with a loader component
      return <h1>Loading</h1>;
    }

    return <Component />;
  };
}

export default ProtectedRoute;
