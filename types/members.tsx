import { type } from "os";

export type MembersProps = {
    username: string;
    email: string;
    date_of_birth: string;
    profile_url: string;
    department: string;
    nickname: string;
    gender: string;
    services: string;
    favorite_life_quote: string;
    linkedin_url: string;
    insta_url: string;
    twitter_url: string;
    phone_number: string;
    isAdmin: boolean
}[]

export type ProfileInfoProps = {
  department: string;
  nickname: string;
  date_of_birth: string;
  gender: string;
  services: string;
  favorite_life_quote: string;
  linkedin_url: string;
  insta_url: string;
  twitter_url: string;
  phone_number: string | null;
};

export type UserProfileProps = {
  department: string;
  nickname: string;
  date_of_birth: string;
  gender: string;
  services: string;
  favorite_life_qoute: string;
  linkedin_link: string;
  insta_link: string;
  twitter_link: string;
  phone_number: string | null;
};