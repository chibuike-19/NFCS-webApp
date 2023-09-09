"use client"

import Button from "@/app/component/button";


const Security = () => {
  return (
    <div className="sm:p-6 p-0 mb-6">
      <div className="flex sm:justify-between sm:flex-row sm:gap-0 gap-8 flex-col p-4 rounded-md border-2 border-[#F1F1F1]">
        <div><p className="text-[18px]">Change Password</p><p className="text-xs text-gray-500">set a secured password for your account</p></div>
        <div>
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