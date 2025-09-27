import AnouncementCard from '@/components/AnouncementCard'
import Footer from '@/components/Footer'
import { useUser } from '@/context/UserContext'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)')({
  component: PagesLayout,
})

function PagesLayout() {
  const {user} = useUser()
  //Do the first one below if the user is not logged in:
  if(!user){
     return (
        <section className="min-h-[40vh] flex flex-col justify-center">
            <div className="">
                {/* The Warning Card */}
                <div className="mx-auto mt-10 text-gray-950 text-center w-full md:w-lg border-1 border-gray-200 p-12 flex flex-col  space-y-10 md:rounded-2xl bg-white shadow  
                                dark:text-white dark:bg-gray-700 dark:border-gray-800 dark:shadow-gray-950 dark:shadow-2xl
                                ">
                    <p className="text-shadow-2xs tracking-tight text-xl">Sign in to join the conversation! </p>
        <Link to="/login" className="py-4 px-8 font-semibold bg-blue-400 text-white hover:bg-blue-500 mx-auto rounded-xl shadow-md">Sign In →</Link>
 
                </div>
            </div>
        </section>
     )
  }
  return (
  <>
     <main className="flex justify-center p-6 min-h-[600px] h-[94vh]">
      <div className="w-full h-full lg:w-6xl bg-white rounded-2xl shadow-lg p-8">
        <Outlet />
      </div>
     </main>

  </>
  )
}
