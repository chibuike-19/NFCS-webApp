"use client";
import { useRouter } from "next/navigation";
import { auth } from "../context/firebase";

function ProtectedRoute(Component: any) {
  return function WithProtected(props: any) {
    const router = useRouter();

    if (!auth?.currentUser) {
      router.replace("/login");
      return <h1>Loading</h1>;
    }
    return <Component />;
  };
}

export default ProtectedRoute;
