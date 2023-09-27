"use client";

import SecondProtectedRoute from "../../component/protectedRoute2";
import { useAuth } from "../../context/authService";
import { useState, useEffect } from "react";
import Modal from "@/app/component/modal";
import MediaContent from "@/app/component/mediaContent";


interface MediaProps {
  children: React.ReactNode;
}

const Media: React.FC<MediaProps> = ({}) => {
  const { mediaUrls, deletePhoto, isAdmin, modal, setModal, downloadPhoto } =
    useAuth();
  const [imagesNum, setImagesNum] = useState(0);
  // SecondProtectedRoute();

  useEffect(() => {
    setImagesNum(mediaUrls.length)
  }, [mediaUrls])

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-3xl">
            Welcome To <span className="text-[#007BA0]">NFSC Unilag</span> media
            gallery
          </h1>
          <p className="text-sm pb-6">
            There's a total of{" "}
            <span className="text-[#007BA0]">{imagesNum}</span> images available
            for you to view and download
          </p>
        </div>
        <div>
          {isAdmin && (
            <button className="bg-[#007BA0] rounded-md py-2 md:py-4 md:px-6 px-4 text-white">
              Upload Photo
            </button>
          )}
        </div>
      </div>

      <div className="">
        <MediaContent />
      </div>
    </div>
  );
};

export default Media;
