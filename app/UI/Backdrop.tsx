"use client"

import React,{useEffect, useRef} from 'react';
import { useAuth } from '../context/authService';




const Backdrop: React.FC<{ children: React.ReactNode }> = (props) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const { setModal, modal } = useAuth();

  useEffect(() => {
    const handleOutsideClick: EventListener = (event) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modal]);

    return (
      <div className="absolute inset-0 bg-[#00000086] flex justify-center items-center backdrop-blur z-50">
        {props.children}
      </div>
    );
  };

export default Backdrop;
