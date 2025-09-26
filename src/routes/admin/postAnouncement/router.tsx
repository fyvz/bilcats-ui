import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/postAnouncement/router')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/postAnouncement/router"!</div>
}
