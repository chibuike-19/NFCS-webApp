
import Image from "next/image";
import GameImage from "../../../../public/imgs/games.png"


const Games = () => {
    return (
      <div className="grid place-content-center">
        <Image src={GameImage} alt="GamePad Image"/>
      </div>
    );
}

export default Games