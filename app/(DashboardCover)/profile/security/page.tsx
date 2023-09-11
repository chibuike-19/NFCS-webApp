"use client"

import Button from "@/app/component/button";
import { useAuth } from "@/app/context/authService";


const Security = () => {

  const {handleIsReset} = useAuth()
  
  return (
    <div className="sm:pt-12 sm:pl-6 pt-6 mb-6">
      <div className="text-2xl font-semibold mb-4">
        <p>Security Settings</p>
      </div>
      <div className="flex sm:justify-between sm:flex-row sm:gap-0 gap-8 flex-col p-4 rounded-md border-2 border-[#F1F1F1]">
        <div>
          <p className="text-[18px]">Change Password</p>
          <p className="text-xs text-gray-500">
            set a secured password for your account
          </p>
        </div>
        <div onClick={handleIsReset}>
          <Button
            value="Change Password"
            extraClassnames="rounded-lg px-6 sm:px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Security;