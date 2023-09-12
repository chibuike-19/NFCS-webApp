
import Image from "next/image";
import ElectionImg from "../../../../public/imgs/ballot.png"

const UserElection = () => {
  return (
    <div className="h-[75vh]">
      <div className="h-full grid place-content-center">
        <Image src={ElectionImg} alt="Ballot box" />
        <p className="text-3xl text-[#007BA0] text-center mt-2">Coming Soon</p>
      </div>
    </div>
  );
};

export default UserElection;