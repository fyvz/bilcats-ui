import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/cats/$catNameSlug')({
  component: CatDetailLayout,
})

//TODO: Refactor Layouts later
function CatDetailLayout() {
  return (  <>
     <main className="flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
        <Outlet />
      </div>
     </main>


  </>)
}
