"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authService";
import { ProfileInfoProps, UserProfileProps } from "../../../../types/members";

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
        {/* <span className="text-gray-600 text-sm pt-4 pl-6">
          {currentStep == 1 ? "Basic Info About you" : "Additional info"}
        </span> */}
      </div>
      <div className="flex pl-6 border-b-2 border-b-black gap-4 items-center">
        <p className={`${currentStep == 1 && 'border-b-4 border-b-blue-500'} cursor-pointer`} onClick={() => switchPage(1)}>Basic Info</p>
        <p className={`${currentStep == 2 && 'border-b-4 border-b-blue-500'} cursor-pointer`} onClick={() => switchPage(2)}>Additional Info</p>
      </div>
      <div>
        {currentStep == 1 ? (
          <div>
            {isUpdate ? (
              <>
                <UpdateInfo />
              </>
            ) : (
              <BasiInfo />
            )}
          </div>
        ) : (
          <div>
            {isUpdate ? (
              <>
                <UpdateInfo />
              </>
            ) : (
              <BasiInfo />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;


export const BasiInfo = () => {
 const {userProfileInfo} = useAuth()
  
 const {nickname, date_of_birth, favorite_life_qoute, gender, insta_link, services, twitter_link, linkedin_link, phone_number, department} = userProfileInfo

  return (
    <div>
      <div>
        <p>{nickname}</p>
        <p></p>
      </div>
      <div>
        <p>{date_of_birth}</p>
        <p></p>
      </div>
      <div>
        <p>{department}</p>
        <p></p>
      </div>
      <div>
        <p>{favorite_life_qoute}</p>
        <p></p>
      </div>
      <div>
        <p>{gender}</p>
        <p></p>
      </div>
      <div>
        <p>{insta_link}</p>
        <p></p>
      </div>
      <div>
        <p>{services}</p>
        <p></p>
      </div>
      <div>
        <p>{twitter_link}</p>
        <p></p>
      </div>
      <div>
        <p>{linkedin_link}</p>
        <p></p>
      </div>
      <div>
        <p>{phone_number}</p>
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
