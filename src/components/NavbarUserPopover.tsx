import { logoutUser } from "@/api/auth";
import { useUser } from "@/context/UserContext";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"
import { Link, useNavigate } from "@tanstack/react-router";
import { FaRegUser } from "react-icons/fa";

const NavbarUserPopover = () => {
  const navigate = useNavigate()
  const {user, setUser, setAccessToken} = useUser()

  const handleLogout = async () => {
    try {
      await logoutUser()
      setAccessToken(null);
      setUser(null);
      navigate({to: "/"}) //go back home
    } catch (err) {
      console.log("Failed to logout - ",err);
    }
  }
   
  return (
    <Menu as="span" className="relative flex items-center">
      <MenuButton className="flex items-center space-x-2 border-b border-b-transparent
                     hover:text-indigo-400 hover:border-b-indigo-400 duration-100 ease-in h-full cursor-pointer outline-0">
        <FaRegUser/>
        {user ? 
            <span>
              {user.username}
            </span>
         : (
          <span>Sign In</span>
        )}
      </MenuButton>
      <MenuItems className="absolute top-7 right-0 translate-x-1/2 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
      {user ? 
      (<>
          <div className="w-full p-1">
            <p className="mt-1 text-center text-base text-neutral-700 cursor-default">Hello, {user.username}</p>
            <MenuItem>
                <Link
            to="/profile/$userSlug"
            params={{ userSlug: user.username.toLowerCase() }}
            className="group block w-full text-center  px-2 py-2 text-base text-blue-500 text-shadow-xs data-[active]:bg-blue-50 data-[active]:text-blue-800 cursor-pointer"
            onClick={e => e.stopPropagation()}
          >Profile
          </Link>
            </MenuItem>
            <MenuItem>
              <button onClick={handleLogout} className="group block w-full text-center  px-2 py-2 text-base text-red-500 text-shadow-xs data-[active]:bg-red-50 data-[active]:text-red-800 cursor-pointer">
              Sign Out
              </button>
            </MenuItem>
          </div>
      </>) 
      : 
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