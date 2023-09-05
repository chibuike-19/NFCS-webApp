"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authService";
import { ProfileInfoProps } from "../../../../types/members";

const PersonalInformation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);

  const switchPage = (pageNum: number) => {
    if (pageNum == 1) {
      setCurrentStep(pageNum);
    } else {
      setCurrentStep(2);
    }
  };
  return (
    <div>
      <div>
        <p className="text-[20px] font-bold pl-6 pt-4">Personal Information</p>
        <span className="text-gray-600 text-sm pt-4 pl-6">
          {currentStep == 1 ? "Basic Info About you" : "Additional info"}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <p onClick={() => switchPage(1)}>Basic Info</p>
        <p onClick={() => switchPage(2)}>Additional Info</p>
      </div>
      <div>
        {currentStep == 1 ? (
          <div>
            {isUpdate ? (
              <>
                <UpdateInfo/>
              </>
            ) : (
              <BasiInfo/>
            )}
          </div>
        ) : (
          <div>
            {isUpdate ? (
              <>
                <UpdateInfo/>
              </>
            ) : (
              <BasiInfo/>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;


export const BasiInfo = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoProps>({
    date_of_birth: "",
    department: "",
    services: "",
    favorite_life_quote: "",
    twitter_url: " ",
    insta_url: "",
    phone_number: "",
    gender: "",
    linkedin_url: "",
    nickname: "",
  });
  const { getUserProfile, user } = useAuth();

  useEffect(() => {
    let profileInfo = getUserProfile(user);
    setProfileInfo(profileInfo as unknown as ProfileInfoProps)
  }, []);

  return (
    <div>
      <div>
        <p>{profileInfo?.nickname}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.date_of_birth}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.department}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.favorite_life_quote}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.gender}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.insta_url}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.services}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.twitter_url}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.linkedin_url}</p>
        <p></p>
      </div>
      <div>
        <p>{profileInfo.phone_number}</p>
        <p></p>
      </div>
    </div>
  );
};

export const UpdateInfo = () => {
  return (
    <div>
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
      <label htmlFor=""></label>
      <input type="text" />
    </div>
  );
}
