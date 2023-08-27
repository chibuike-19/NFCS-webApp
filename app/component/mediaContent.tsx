"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/authService";
import { FcLike, FcLikePlaceholder, FcDownload } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import {CiMenuKebab} from "react-icons/ci"
import {BsThreeDotsVertical} from "react-icons/bs"
import Modal from "./modal";

const MediaContent = () => {
  const {
    mediaUrls,
    deletePhoto,
    isAdmin,
    modal,
    user,
    setModal,
    downloadPhoto,
    setMediaUrls,
  } = useAuth();
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);

  useEffect(() => {
    //If true, carry out the function else return
    if (!confirmDelete) return;

    deletePhoto(fileToDelete);

    setConfirmDelete(false);
    console.log("deleted");
  }, [confirmDelete]);

  const handleDeletePhoto = (file: any) => {
    //Open modal
    setModal(true);

    setFileToDelete(file);
  };



  const toggleLiked = (fullPath: String) => {
    setMediaUrls((prev) =>
      prev.map((image) =>
        image.fullpath === fullPath
          ? {
              ...image,
              liked: !image.liked,
              disliked: image.liked ? false : image.disliked,
              likes: image.liked ? image.likes - 1 : image.likes + 1,
              likedBy: image.liked
                ? image.likedBy
                : [...image.likedBy, user?.email!],
            }
          : image
      )
    );
  };
  return (
    <div>
      {modal ? (
        <Modal
          onConfirm={setConfirmDelete}
          mainText="Are you sure that you want to delete this Picture?"
        />
      ) : (
        <div className="grid mobile:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mediaUrls.map((photo, index) => (
            <div
              key={index}
              className="border-2 bg-white h-[22rem] border-white shadow-lg hover:transform hover:scale-105 transition .3 ease-linear"
            >
              <div className=" h-[16rem] relative">
                <div
                  className={`absolute right-2 flex flex-col gap-4 top-12 py-2 px-8 border-2 border-white bg-white text-black`}
                >
                  {isAdmin && (
                    <button onClick={() => handleDeletePhoto(photo.fullpath)}>
                      Delete <span><MdDelete/></span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      downloadPhoto(photo.fullpath);
                    }}
                  >
                    Download <span><FcDownload/></span>
                  </button>
                </div>
                <button className="absolute top-3 right-3 cursor-pointer">
                  <BsThreeDotsVertical color="white" size={25} />
                </button>
                <img
                  src={photo.urls}
                  alt="media"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between items-center p-4">
                <p>{`Liked by ${photo.likedBy[0]} and ${photo.likedBy.length - 1} others`}</p>
                <div className="flex items-center gap-2">
                  {photo.liked ? (
                    <FcLike
                      onClick={() => toggleLiked(photo.fullpath)}
                      color="#F3F6F7"
                      size={30}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FcLikePlaceholder
                      onClick={() => toggleLiked(photo.fullpath)}
                      color="#F3F6F7"
                      size={30}
                      className="cursor-pointer"
                    />
                  )}
                  {photo.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaContent;
