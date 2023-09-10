"use client"

import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/authService";

interface CardProps {
    children: React.ReactNode;
    className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {

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
      <div
        ref={modalRef}
        className={`${className} flex flex-col sm:my-0 mt-[24rem] mb-6 sm:overflow-hidden overflow-y-scroll mx-0 sm:mx-5 bg-white p-2 py-10 rounded-3xl relative`}
      >
        {children}
      </div>
    );
};

export default Card;
