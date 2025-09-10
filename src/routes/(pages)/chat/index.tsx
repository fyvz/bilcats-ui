import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pages)/chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chat/"!</div>
}
