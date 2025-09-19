import { logoutUser } from '@/api/auth'
import { useUser } from '@/context/UserContext'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

function AuthLayout() {
  const {user, setUser, setAccessToken} = useUser()
  const navigate = useNavigate()
  const handleLogoutAuth = async () => {
    try {
      await logoutUser()
      setAccessToken(null);
      setUser(null);
      navigate({to: "/login"}) //go back home
    } catch (err) {
      console.log("Failed to logout - ",err);
    }
  }
  if(user){

    return (
      <div className="flex justify-center mt-4 py-8">
        <div className="flex flex-col gap-8 items-start justify-between p-6 w-full  sm:w-md bg-white  sm:rounded-2xl shadow-lg ">
          <p className='text-center w-full'>
            Already signed in!
          </p> 
          <button onClick={handleLogoutAuth} className="group block w-full text-center  px-2 py-2 text-base text-red-500 text-shadow-xs data-[active]:bg-red-50 data-[active]:text-red-800 cursor-pointer">
            Click to log out first
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center mt-4 py-8">
      <div className="flex flex-col gap-8 items-start justify-between p-6 w-full  sm:w-md bg-white  sm:rounded-2xl shadow-lg ">
        <Outlet />
      </div>
    </div>
  )
}
