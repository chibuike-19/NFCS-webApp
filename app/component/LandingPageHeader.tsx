import Image from "next/image";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";

import Logo from "../../public/logo 2.png";
import routes from "./routes";
import { useState } from "react";

interface AppProps {}

const LandingPageHeader: React.FC<AppProps> = ({}) => {
    const [isNavOpen, setIsNavOpen] = useState(false)

  const links = routes.map((route, index) => (
    <li key={index}>
      <Link className="capitalize" href={route.link} onClick={()=>setIsNavOpen(prevState=>!prevState)}>
        {route.name}
      </Link>
    </li>
  ));
  return (
    <section className="flex flex-col md:flex-row gap-5 justify-between bg-white text-themeBlue py-3 md:py-1 px-8 relative shadow-[0_0px_30px_0px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image src={Logo} alt="Logo" width={60} height={60} />
          <h2 className="font-bold text-[.8rem] max-w-[6rem] text-center">
            ST THOMAS MOORE
          </h2>
        </div>
        <CgMenuRight className="text-4xl cursor-pointer md:hidden" onClick={()=>setIsNavOpen(prevState=>!prevState)} />
      </div>
      <nav className={`${isNavOpen ? 'active' : ''} nav flex flex-col md:flex-grow gap-5 md:gap-10 absolute md:static md:flex-row top-[100%] left-0 md:justify-between w-full md:w-auto p-8 bg-white`}>
        <ul className="flex flex-col md:flex-row md:justify-center gap-5 md:flex-1">{links}</ul>
        <Link href="/register" onClick={()=>setIsNavOpen(prevState=>!prevState)} className="md:text-right">Create Account</Link>
      </nav>
    </section>
  );
};

export default LandingPageHeader;
