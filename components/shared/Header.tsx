"use client"
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  const handleClose = () => {
    // Define what should happen when handleClose is called

  };

  return (
    <header className="w-full bg-opacity-50 absolute top-0 z-50">
      <div className="flex wrapper items-center justify-between w-full py-4 px-6">
        <Link href={"/"} className="w-36">
          {/* <Image 
            src={"/assets/images/logo.png"} 
            width={70} 
            height={38} 
            alt="Opes wedding logo" /> */}
        </Link>
        <nav className="hidden md:flex md:flex-grow justify-center gap-5">
          <NavItems handleClose={
            handleClose} />
        </nav>
        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;