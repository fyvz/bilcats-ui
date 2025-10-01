
import OverlayTitle from '@/components/OverlayTitle'
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
        <section className="min-h-[40vh] h-full flex flex-col flex-1 justify-center bg-gradient-to-b from-white via-blue-50 to-white">
            <div className="">
                {/* The Warning Card */}
                <div className="mx-auto mt-10 text-gray-950 text-center w-full md:w-lg border-1 border-blue-100 p-12 flex flex-col  space-y-10 md:rounded-2xl bg-white shadow  
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
    <OverlayTitle image="assets/chat-page-header-bg.jpg" overlayStyle="bg-black/30 backdrop-blur-sm">
  <div className='w-full md:w-xl mx-auto  py-6 text-center'>
        <h1 className='text-white text-3xl mb-4 text-shadow-lg text-shadow-black/30'>Join the Conversation</h1>
        <p className='text-white text-lg text-shadow-lg text-shadow-black/30 mb-2'>
         Collaborate, and share your thoughts with others.  
        </p>
      {/* <div className="mt-2 rounded-2xl bg-black/50 p-4">
      
      </div> */}
  </div>
  </OverlayTitle>

     <main className="bg-white flex  justify-center p-6 min-h-[600px] h-[94vh]">
      <div className="w-full h-full lg:w-6xl  p-8">
        <Outlet />
      </div>


     </main>

  </>
  )
}
