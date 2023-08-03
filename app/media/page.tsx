"use client";

import ProtectedRoute from "../component/protectedRoute";
import SecondProtectedRoute from "../component/protectedRoute2";
import { useAuth } from "../context/authService";
interface MediaProps {
  children: React.ReactNode;
}

const Media: React.FC<MediaProps> = ({}) => {
  const { mediaUrls } = useAuth();
  SecondProtectedRoute();

  const AllPhotos = mediaUrls.map((photo, index) => (
    <div key={index} className="w-50 h-50">
      <img src={photo} alt="media" className="object-contain hover:transform hover:scale-110 transition .3 ease-linear" />
    </div>
  ));

  return <div>
    <h1>Media</h1>
    <div className="grid grid-cols-3 gap-3">
        {AllPhotos}
    </div>
  </div>;
};

export default Media;
