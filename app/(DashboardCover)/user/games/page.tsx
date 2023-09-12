import Image from "next/image";
import GameImage from "../../../../public/imgs/games.png";

const UserGames = () => {
  return (
    <div className="h-[75vh]">
      <div className="grid place-content-center h-full">
        <Image src={GameImage} alt="GamePad Image" />
        <p className="text-3xl text-[#007BA0] text-center mt-2">Coming Soon</p>
      </div>
    </div>
  );
};

export default UserGames;
