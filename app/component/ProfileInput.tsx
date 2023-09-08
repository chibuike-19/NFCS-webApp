import React from "react";


type props = {
    label: string;
    inputType?: string
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}
export const ProfileInput = ({onChange, label, inputType}: props) => {
    return (
      <div className="flex flex-col gap-4">
        <label htmlFor="" className="text-[16px] font-semibold">
          {label}
        </label>
        <input
          type={inputType ?? 'text'}
          onChange={onChange}
          className="p-3 max-w-[20rem] border-2 border-[#007BA0]"
        />
      </div>
    );
}