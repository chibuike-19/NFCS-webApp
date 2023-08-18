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

interface MediaProps {
  children: React.ReactNode;
}


const Media: React.FC<MediaProps> = ({}) => {
  const { mediaUrls, deletePhoto, isAdmin } = useAuth();
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<any>(null)
  SecondProtectedRoute();

  useEffect(()=>{
    //If true, carry out the function else return
    if(!confirmDelete) return

    deletePhoto(fileToDelete);

    setConfirmDelete(false)
    console.log("deleted");
  }, [confirmDelete])

  const handleDeletePhoto = (file: any) => {
    //Open modal
    setModal(true);
    setFileToDelete(file)
    
  };

  if (modal) {
    return (
      <Backdrop>
        <Card className="p-5">
          <h1>Are you sure that you want to delete this Picture?</h1>
          <div className="flex gap-4 justify-center mt-2">
            <button
              onClick={() => {
                setConfirmDelete(true);
                setModal(false);
              }}
              className="border-2 border-blue-500 p-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setModal(false);
              }}
              className="border-2 border-blue-500 p-2"

            >
              No
            </button>
          </div>
        </Card>
      </Backdrop>
    );
  }

  const AllPhotos = mediaUrls.map((photo, index) => (
    <div
      key={index}
      className="w-50 h-50 relative  hover:transform hover:scale-110 transition .3 ease-linear"
    >
      <button
        onClick={() => handleDeletePhoto(photo.fullpath)}
        className={isAdmin ? "absolute top-3 right-3 cursor-pointer" : "hidden"}
      >
        <MdDelete className="text-red-600 text-xl" />
      </button>
      <img src={photo.urls} alt="media" className="object-contain" />
    </div>
  ));

  return (
    <div className="">
      <h1>Media</h1>

      <div className="grid grid-cols-3 gap-3">{AllPhotos}</div>
    </div>
  );
};

export default Media;
