import {useState, useRef, useEffect} from "react"


import { AiOutlineHome } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { PiCat } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
// import { useGlobal } from "../context/GlobalContext";
import { FaBars } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";
import NavbarUserDropDown from "./NavbarUserPopover";


const Navbar = () => {
    



    const [isScrolling, setIsScrolling] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const menuRef = useRef(null);
   
    // This hook ensures mobile menu is blurred when we scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };
        const handleScreenResize = () => {
              const breakpoint = 640;
                if (window.innerWidth >= breakpoint) {
                    setIsMobileMenuOpen(false);
                }
        }
        window.addEventListener("resize", handleScreenResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ( 

        <>
        <div ref={menuRef} className={`fixed w-screen flex items-center justify-center  h-20
                        py-4 md:py-6 px-1 sm:px-4 md:px-12 z-200 text-gray-900 dark:text-gray-100`}>
            {/* Blur effect */}
            <div className={`absolute inset-0 -z-10 transition duration-500  ${isScrolling ? 'backdrop-blur-md  bg-neutral-100/80 dark:bg-gray-800/50' : ' bg-neutral-100 dark:bg-gray-800'}`}></div>
            {/* Navbar Container */}
            <div className="flex justify-around sm:justify-between items-center max-w-[1200px] mx-auto w-full ">
                {/* Logo Container */}
                <Link to="/" >
                <img src="/assets/logo-main.png" alt="BilCats" title="BilCats Home" className="h-10 sm:h-14 md:h-16 object-cover"/>
                </Link>
                {/* Menu Container */}
                {/* TODO: Add dropdown menus here*/}
                <div className="hidden sm:flex  space-x-4 md:space-x-8 h-10 text-sm sm:text-base"> {/* text-sm is a placeholder. Replace the menu with mobile toggle for very small screens*/}
                    <Link to="/" title="Home" className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-green-400 hover:border-b-green-400 duration-100 ease-in"   
                     activeProps={{
                    className: "text-green-400 ",
                    }}>
                        <AiOutlineHome/> <span>Home</span>
                    </Link>
                    
                    <NavbarUserDropDown />

                    <Link to="/chat" title="Chat" className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-blue-400 hover:border-b-blue-400 duration-100 ease-in"
                    activeProps={{
                    className: "text-blue-400 ",
                    }}>
                        <IoChatboxOutline/> <span>Chat</span>
                    </Link>
                    <Link to="/cats" title="The BilCats" className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-amber-400 hover:border-b-amber-400 duration-100 ease-in"         
                    activeProps={{
                    className: "text-amber-400 ",
                    }} >
                        <PiCat/> <span>Cat</span>
                    </Link>
                    <Link to ="/catmap" title="Cat Map" className="flex items-center space-x-2 border-b border-b-transparent hover:text-green-500 hover:border-b-green-500 duration-100 ease-in">
                        <GrMapLocation/> <span>Cat Map</span>
                    </Link>
                    {/*user && (
                        <Link
                            to="/profile/$userSlug"
                            params={{ userSlug: user.username.toLowerCase() }}
                            title={user.username}
                            className="flex items-center space-x-2 border-b border-b-transparent hover:text-indigo-400 hover:border-b-indigo-400 duration-100 ease-in"
                        >
                            <FaRegUser /> <span>{user.username}</span>
                        </Link>
                    )}

                    {/* {!user ? (
                    <Link to="/login/" title={"Sign In"} className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-indigo-400 hover:border-b-indigo-400 duration-100 ease-in">
                        <FaRegUser/> <span>Sign In</span>
                    </Link>
                    ) :(
                    <Link to="/logout/" title={"Sign Out"} className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-indigo-400 hover:border-b-indigo-400 duration-100 ease-in">
                        <FaRegUser/> <span>Sign Out</span>
                    </Link>
                    
                    )}
   */}
                </div>
                <button 
                    className="block sm:hidden hover:text-blue-400 duration-100 ease-in cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <FaBars className="text-3xl"/> 
                </button>
            </div>
        
        {/* Mobile Menu */}
 
            <div className={`absolute top-full left-0 w-full shadow-lg sm:hidden z-50 duration-200 transition ${isMobileMenuOpen?"translate-x-0": "translate-x-full"}`}>
                    {/* Blur effect */}
                 <div className={`absolute inset-0 -z-10 transition duration-500  ${isScrolling ? 'backdrop-blur-sm   bg-neutral-50/80 dark:bg-gray-800/50' : ' bg-neutral-100 dark:bg-gray-800'}`}></div>
                <div className="flex flex-col items-center pb-2 text-lg">
                    <div className="">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 py-2 hover:text-green-400">
                            <AiOutlineHome/> <span>Home</span>
                        </Link>
                        <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 py-2 hover:text-blue-400">
                            <IoChatboxOutline/> <span>Chat</span>
                        </Link>
                        <Link to="/cats" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 py-2 hover:text-amber-400">
                            <PiCat/> <span>Cat</span>
                        </Link>
                        {/* <Link to="/login/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 py-2 hover:text-red-400">
                            <FaRegUser/> <span>{user?.loggedIn ? `${user?.userName}` : "Sign In"}</span>
                        </Link> */}
                    </div>
                </div>
            </div>
  


        </div>

        
        <div className="h-20">
            {/* Empty div for spacing. Leave as is */}
        </div>
        </>
     );
}
 
export default Navbar;
