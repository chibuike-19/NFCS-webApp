"use client";


import SecondProtectedRoute from "../../component/protectedRoute2";
import SideMenu from "../../component/sideMenu";
import { UsersidebarMenuData } from "@/data/sidebaMenuData";
import { AdminsidebarMenuData } from "@/data/sidebaMenuData";
import { useAuth } from "../../context/authService";
import { MdDelete } from "react-icons/md";


interface MediaProps {
  children: React.ReactNode;
}

const Media: React.FC<MediaProps> = ({}) => {
  const { mediaUrls, deletePhoto, isAdmin } = useAuth();
  SecondProtectedRoute();


  const handleDeletePhoto = (file: any) => {
    deletePhoto(file);
    console.log("deleted");
    console.log(file);
  };

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
