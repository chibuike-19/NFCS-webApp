"use client";

import SecondProtectedRoute from "../../component/protectedRoute2";
import SideMenu from "../../component/sideMenu";
import { UsersidebarMenuData } from "@/data/sidebaMenuData";
import { AdminsidebarMenuData } from "@/data/sidebaMenuData";
import { useAuth } from "../../context/authService";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Backdrop from "@/app/UI/Backdrop";
import Card from "@/app/UI/Card";
import Modal from "@/app/component/modal";
import MediaContent from "@/app/component/mediaContent";
import { FcDownload } from "react-icons/fc";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Image from "next/image";

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
