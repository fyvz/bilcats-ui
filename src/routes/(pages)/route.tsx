import Footer from '@/components/Footer'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)')({
  component: PagesLayout,
})

function PagesLayout() {
    
  return (
  <>
     <main className="flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <Outlet />
      </div>
     </main>


  </>
  )
}
