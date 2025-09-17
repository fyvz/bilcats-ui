import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center mt-4  ">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between p-6 w-full  lg:w-3xl bg-white rounded-2xl shadow-lg ">
        {/* The Left Side */}
        <div className="flex flex-col space-y-2 md:w-1/2 ">

          <h1 className='text-3xl font-bold mb-4 text-gray-800'>Welcome to BilCats</h1>
          <div className=''>
                  <img src="/assets/logo-main.png" alt="BilCats" title="BilCats Home" className="h-10 sm:h-14 md:h-16 object-cover opacity-20"/>
          </div>
     
          <p  className='text-gray-800 font-normal max-w-sm'>Description <br/> Here</p>
        </div>
          {/* Right Side */}
        <div className="w-full md:w-1/2 text-gray-600">
          <Outlet />
        </div>
    </div>
  </div>

  )
}
