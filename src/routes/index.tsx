import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'




const catloaderQueryOptions = () => queryOptions({
  queryKey: ['catloader'],
  queryFn: async () => {
    const res = await fetch("/cat_profiles.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return {cats:data.cats.slice(2,4)} //We return only 2 items here, may look into changing later
  },
})


export const Route = createFileRoute('/')({
  loader: ({context:{queryClient}}) => queryClient.ensureQueryData(catloaderQueryOptions()),
  component: App,
})

function App() {
  
  const { data } = useSuspenseQuery(catloaderQueryOptions())
  console.log(data);
  return (
  <>
  My App
  </>
  )
}
