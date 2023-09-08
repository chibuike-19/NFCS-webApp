"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authService";
import NonEditableProfileInput from "@/app/component/nonEditableProfileInput";
import Backdrop from "@/app/UI/Backdrop";
import Button from "@/app/component/button";
import Card from "@/app/UI/Card";
import { ProfileInput } from "@/app/component/ProfileInput";

const PersonalInformation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);

  const {modal, setModal} = useAuth()

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
        <p className="text-[20px] font-bold pl-4 pt-12">Personal Information</p>
        {/* <span className="text-gray-600 text-sm pt-4 pl-6">
          {currentStep == 1 ? "Basic Info About you" : "Additional info"}
        </span> */}
      </div>
      <div className="flex pl-4 border-b-2 border-b-[#F1F1F1] gap-4 items-center">
        <p
          className={`${
            currentStep == 1 && "border-b-4 border-b-[#007BA0]"
          } cursor-pointer`}
          onClick={() => switchPage(1)}
        >
          Basic Info
        </p>
        <p
          className={`${
            currentStep == 2 && "border-b-4 border-b-[#007BA0]"
          } cursor-pointer`}
          onClick={() => switchPage(2)}
        >
          Additional Info
        </p>
      </div>
      <div>
        {currentStep == 1 ? (
          <div>
            {modal ? (
              <>
                <UpdateInfo />
              </>
            ) : (
              <BasiInfo advanced={false} />
            )}
          </div>
        ) : (
          <div>
            {modal ? (
              <>
                <UpdateInfo />
              </>
            ) : (
              <BasiInfo advanced={true} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;


type props = {
  advanced: boolean
}
export const BasiInfo = ({advanced}: props) => {
 const {userProfileInfo, user} = useAuth()
  
  const {nickname, date_of_birth, department, favorite_life_qoute,gender, insta_link, twitter_link, linkedin_link, services, phone_number} = userProfileInfo

  return (
    <div>
      {!advanced ? (
        <>
          <NonEditableProfileInput
            label={"Full Name"}
            value={user?.displayName!}
          />
          <NonEditableProfileInput label="Nick Name" value={nickname} />
          <NonEditableProfileInput label="Department" value={department} />
          <NonEditableProfileInput label="Gender" value={gender} />
          <NonEditableProfileInput
            label="Phone number(optional)"
            value={phone_number!}
          />
          <NonEditableProfileInput
            label="Date of birth"
            value={date_of_birth}
          />
        </>
      ) : (
        <>
          {" "}
          <NonEditableProfileInput label="Twitter Link" value={twitter_link} />
          <NonEditableProfileInput label="Instagram link" value={insta_link} />
          <NonEditableProfileInput
            label="LinkedIn Link"
            value={linkedin_link}
          />
          <NonEditableProfileInput label="Services" value={services} />
          <NonEditableProfileInput
            label="Favorite life quote"
            value={favorite_life_qoute!}
          />
        </>
      )}
      <div className="flex justify-end my-6">
        <Button
          value="Update"
          extraClassnames="px-8 py-3 bg-[#007BA0] rounded-lg"
        />
      </div>
    </div>
  );
};

export const UpdateInfo = () => {

  const {userProfileInfo, setUserProfileInfo, updateUserProfile} = useAuth()


  return (
    <Backdrop>
      <Card>
        <div>
          <form
            action=""
            className="grid grid-cols-1 sm:grid-cols-3"
            onSubmit={(e) => updateUserProfile(e)}
          >
            <ProfileInput
              label="Nick name"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  nickname: e.target.value,
                })
              }
            />
            <ProfileInput
              label="Favorite Life Quote"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  favorite_life_qoute: e.target.value,
                })
              }
            />
            <ProfileInput
              label="Department"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  department: e.target.value,
                })
              }
            />
            <ProfileInput
              label="Date of Birth"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  date_of_birth: e.target.value,
                })
              }
            />
            <ProfileInput
              label="Phone Number"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  phone_number: e.target.value,
                })
              }
            />
            <ProfileInput
              label="Gender"
              onChange={(e) =>
                setUserProfileInfo({
                  ...userProfileInfo,
                  gender: e.target.value,
                })
              }
            />
            <Button value="Submit" />
          </form>
        </div>
      </Card>
    </Backdrop>
  );
}
