import { User } from "firebase/auth";
import { MembersProps, UserProfileProps } from "./members";
import { UpcomingEventsProps } from "./UpcomingEvents";
import { DatabaseReference } from "firebase/database";

export type ContextProp = {
  children: React.ReactNode;
};

export type ValueProp = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logOut: () => Promise<unknown>;
  loginWithGoogle: () => Promise<unknown>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  createNewUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;

  resetPassword: (email: string) => Promise<any>;
  updateUserProfilePicture: (
    file: any,
    currentUser: any,
    setUrlLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  setAuthPersistence: React.Dispatch<React.SetStateAction<boolean>>;
  authPersistence: boolean;

  userEmailRef: React.RefObject<HTMLInputElement> | null;
  userPasswordRef: React.RefObject<HTMLInputElement> | null;
  userNameRef: React.RefObject<HTMLInputElement> | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isReset: boolean;
  handleIsReset: () => void;
  adminPhotoUpload: (file: any) => Promise<void>;
  mediaUrls: {
    urls: string;
    fullpath: string;
    likes: number;
    liked: boolean;
    disliked: boolean;
    likedBy: string[];
    showmenu: boolean;
  }[];
  setMediaUrls: React.Dispatch<
    React.SetStateAction<
      {
        urls: string;
        fullpath: string;
        likes: number;
        liked: boolean;
        disliked: boolean;
        likedBy: string[];
        showmenu: boolean;
      }[]
    >
  >;
  members: MembersProps;
  setMembers: React.Dispatch<React.SetStateAction<MembersProps>>;
  setUpcomingEvents: React.Dispatch<React.SetStateAction<UpcomingEventsProps>>;
  upcomingEvents: UpcomingEventsProps;
  handleDeleteEvent: (reference: DatabaseReference) => void;
  deletePhoto: (file: any) => void;
  isAdmin: boolean;
  isMobile: boolean;
  showMenu: boolean;
  toggleMenu: () => void;
  setIsMobile: (value: React.SetStateAction<boolean>) => void;
  getUserProfile: () => Promise<object>;
  modal: boolean;
  setModal: (value: React.SetStateAction<boolean>) => void;
  downloadPhoto: (file: any) => void;
  userProfileInfo: UserProfileProps;
  setUserProfileInfo: React.Dispatch<React.SetStateAction<UserProfileProps>>;
  updateUserProfile: (e: any) => void
};
