import { useUser } from '@/context/UserContext';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userSlug')({
  component: ProfileRoute,
})

function ProfileRoute() {
const { user } = useUser();
  if (!user) {
    return (
        <section className="min-h-[40vh] h-full flex flex-col flex-1 justify-center bg-gradient-to-b from-white via-blue-50 to-white">
            <div className="">
                {/* The Warning Card */}
                <div className="mx-auto mt-10 text-gray-950 text-center w-full md:w-lg border-1 border-blue-100 p-12 flex flex-col  space-y-10 md:rounded-2xl bg-white shadow  
                                dark:text-white dark:bg-gray-700 dark:border-gray-800 dark:shadow-gray-950 dark:shadow-2xl
                                ">
                    <p className="text-shadow-2xs tracking-tight text-xl">Sign in to view profiles! </p>
        <Link to="/login" className="py-4 px-8 font-semibold bg-blue-400 text-white hover:bg-blue-500 mx-auto rounded-xl shadow-md">Sign In →</Link>
 
                </div>
            </div>
        </section>
    );
  }
  // If the user is logged in:
  return (
    <>
    <Outlet></Outlet>
    </>
  )
}
