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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [imagesNum, setImagesNum] = useState(0);
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  SecondProtectedRoute();

  useEffect(() => {
    //If true, carry out the function else return
    if (!confirmDelete) return;

    deletePhoto(fileToDelete);

    setConfirmDelete(false);
    console.log("deleted");
  }, [confirmDelete]);

  useEffect(() => {
    setImagesNum(mediaUrls.length)
  }, [mediaUrls])

  const handleDeletePhoto = (file: any) => {
    //Open modal
    setModal(true);

    setFileToDelete(file);
  };

  if (modal) {
    return (
      <Modal
        onConfirm={setConfirmDelete}
        mainText="Are you sure that you want to delete this Picture?"
      />
    );
  }


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
            <button className="bg-[#007BA0] rounded-md py-4 px-6 text-white">
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
