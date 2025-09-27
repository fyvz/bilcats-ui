import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/post-anouncement/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/postAnouncement/"!</div>
}
