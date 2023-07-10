"use client";

import ProtectedRoute from "@/app/component/protectedRoute";
import { useAuth } from "@/app/context/authService";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const LogOut = () => {
    logOut
    router.push('/')
  }
  return (
  <div>Hello, {user?.displayName}
  <button onClick={LogOut}>log Out</button>
  </div>
  );
};
export default ProtectedRoute(UserDashboard);
