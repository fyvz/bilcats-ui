

import { Link } from "@tanstack/react-router";
import { AiOutlineHome } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { PiCat } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { LuPawPrint } from "react-icons/lu";

const Footer = () => {
    
    const user = {
        userName: "",
        loggedIn: false,

    }
    return ( 
        <>
        <section className="bg-white dark:bg-gray-900">
            {/* Grid Container */}
            <div className="flex flex-col md:flex-row justify-between mx-auto max-w-4xl align-center text-gray-900  dark:text-white">
                {/* Left Column */}
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center sm:text-left flex-grow ">About BilCats <LuPawPrint className='inline-block text-md text-amber-500 -top-1 relative '/></h2>
                    <p className="text-shadow-2xs text-center sm:text-justify">
                        BilCats is a cozy little corner of the internet made just for cat lovers. Whether you're here to share photos, swap stories, or find your next feline friend, we're building a warm and curious community — one paw at a time.
                    </p>
                </div>
                {/* Right Column */}
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center sm:text-left md:w-xs">Navigation</h2>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-baseline'>
                        <Link to="/" className="flex items-center space-x-2 py-2 hover:text-green-400">
                            <AiOutlineHome/> <span>Home</span>
                        </Link>
                        <Link to="/chat" className="flex items-center space-x-2 py-2 hover:text-blue-400">
                            <IoChatboxOutline/> <span>Chat</span>
                        </Link>
                        <Link to="/cats" className="flex items-center space-x-2 py-2 hover:text-amber-400">
                            <PiCat/> <span>Cat</span>
                        </Link>
                        {/* <Link to="/user/" className="flex items-center space-x-2 py-2 hover:text-red-400">
                            <FaRegUser/> <span>{user.loggedIn ? `${user.userName}` : "Sign In"}</span>
                        </Link> */}
                    </div>
                </div>
            </div>
            {/* End of Grid. Final Stamp */}
            <footer className='px-4 text-center mb-4 text-shadow-2xs text-gray-900 dark:text-gray-200'>&copy; 2025 BilCats. All rights reserved. Created by BilCats Team <LuPawPrint className='inline-block text-md text-amber-500 -top-0.5 relative '/> at Bilkent University</footer>
  
              </section>
        </>
     );
}
 
export default Footer;