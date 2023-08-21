import Image from "next/image";
import Logo from "../../public/logo 2.png";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { CgInstagram } from "react-icons/cg";
import { BsLinkedin, BsTelephoneFill, BsTwitter } from "react-icons/bs";
import { GrLocation, GrMail } from "react-icons/gr";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-white px-8 pb-3 pt-10 shadow-[0_20px_40px_0px_rgba(0,0,0,1)] font-[500] text-sm">
      <section className="grid gap-7 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 justify-center items-center sm:items-start text-center sm:text-left mb-10 md:mb-16">
        <div className="flex gap-2 justify-center sm:justify-start flex-col sm:flex-row items-center text-themeBlue">
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <h2 className="font-bold text-[.8rem] max-w-[6rem] text-center">
            ST THOMAS MOORE
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/">Home</Link>
          <p>
            Help <span className="border-l-[1.5px] border-black pl-1">Get in touch</span>
          </p>
          <p>About our church</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-[1rem]">Contact Us</h3>
          <div className="flex items-center gap-1 justify-center sm:justify-start">
            <GrLocation />
            <address className="not-italic">131 Association avenue</address>
          </div>
          <div className="flex justify-center sm:justify-start items-center gap-1">
            <GrMail />
            <a href="mailto:support@gmail.com">support@gmail.com</a>
          </div>
          <div className="flex items-center gap-1 justify-center sm:justify-start">
            <BsTelephoneFill />
            <a href="tel:+2348012345678">+2348012345678</a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3>Testimonies</h3>
          <p>Sermons</p>
          <p>
            Giving <span>Donations</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3>Follow us:</h3>
          <div className="flex justify-center sm:justify-start gap-4 mt-2 text-xl">
            <FiFacebook />
            <CgInstagram />
            <BsLinkedin />
            <BsTwitter />
          </div>
        </div>
      </section>
      <p className="text-center">(c) 2023. St. Thomas Moore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
