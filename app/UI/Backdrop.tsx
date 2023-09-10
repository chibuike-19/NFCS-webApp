"use client"

import React from 'react';


const Backdrop: React.FC<{ children: React.ReactNode }> = (props) => {


    return (
      <div className="absolute inset-0 bg-[#00000086] flex justify-center sm:overflow-hidden overflow-y-scroll items-center backdrop-blur z-50">
        {props.children}
      </div>
    );
  };

export default Backdrop;
