import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  return <div>Hello "/(auth)/login/"!</div>
}
