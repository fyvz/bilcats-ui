import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'



type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})


function RootLayout(){

  return (
     <div className='min-h-screen bg-gray-100 flex flex-col '>
      <Navbar />
      <div className="flex-grow flex flex-col">
        <Outlet />
      </div>
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Footer />
    </div>
  )
}


const NotFound = () => {
  
    
    return ( 
        <section className="min-h-[40vh] flex flex-col justify-center">
            <div className="">
                {/* The Warning Card */}
                <div className="mx-auto mt-10 text-gray-950 text-center w-full md:w-lg border-1 border-gray-200 p-12 flex flex-col  space-y-10 md:rounded-2xl bg-white shadow  
                                dark:text-white dark:bg-gray-700 dark:border-gray-800 dark:shadow-gray-950 dark:shadow-2xl
                                ">
                    <h1 className="font-bold text-6xl text-shadow-2xs">404</h1>
                    <p className="text-shadow-2xs tracking-tight text-xl">The requested page could not be found. </p>
                    <Link to="/" className="py-4 px-8 font-semibold bg-blue-400 text-white hover:bg-blue-500 mx-auto rounded-xl shadow-md">← Back to Home</Link>
                </div>
            </div>
        </section>
     );
}
 
