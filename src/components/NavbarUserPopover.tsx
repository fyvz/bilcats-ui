import { useUser } from "@/context/UserContext";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"
import { Link } from "@tanstack/react-router";
import { FaRegUser } from "react-icons/fa";

const NavbarUserPopover = () => {
  
  const {user} = useUser()
    

  return (
    <Menu as="span" className="relative flex items-center">
      <Menu.Button className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-indigo-400 hover:border-b-indigo-400 duration-100 ease-in h-full cursor-pointer outline-0">
            <FaRegUser/> <span>Sign In</span>
      </Menu.Button>
      <MenuItems className="absolute top-7 right-0 translate-x-1/2 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
      {user ? 
      (<></>) : 
      (<>
          <div className="w-full p-1">
            <p className="mt-1 text-center text-base text-neutral-700 cursor-default">Not Logged In</p>
          </div>
          <MenuItem>
            <Link to="/login" className="group block w-full text-center  px-2 py-2 text-base text-blue-500 text-shadow-xs data-[active]:bg-blue-50 data-[active]:text-blue-800 cursor-pointer">
            Sign In
            </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register" className="group block w-full text-center  px-2 py-2 text-base text-amber-500 text-shadow-xs data-[active]:bg-amber-50 data-[active]:text-amber-500 cursor-pointer">
            Sign Up
          </Link>
        </MenuItem>
      </>)}

      </MenuItems>
    </Menu>
  );
}
 
export default NavbarUserPopover;