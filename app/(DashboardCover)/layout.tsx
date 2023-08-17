"use client";

import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authService";
import DashboardHeader from "../component/dashboardHeader";
import SideMenu from "../component/sideMenu";
import { AdminsidebarMenuData, UsersidebarMenuData } from "@/data/sidebaMenuData";

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {isAdmin} = useAuth();

  return (
    <>
      <div className="flex relative">
        <SideMenu
          sidebarMenuData={isAdmin ? AdminsidebarMenuData : UsersidebarMenuData}
        />
        <main className="w-full pl-6 h-screen overflow-y-scroll overflow-x-hidden bg-[#F1F1F1]">
          <Toaster position="top-right" />
          <DashboardHeader />
          {children}
        </main>
      </div>
    </>
  );
}
