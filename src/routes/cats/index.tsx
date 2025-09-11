import CatCardHome from '@/components/CatCardHome';
import type { Cat } from '@/types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

const catQueryOptions = () => queryOptions({
  queryKey: ['cats'],
  queryFn: async () => {
    const res = await fetch("/cat_profiles.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data
  },
})


export const Route = createFileRoute('/cats/')({
  component: CatPageHome,
  loader: ({context:{queryClient}}) => queryClient.ensureQueryData(catQueryOptions()),
})


function CatPageHome() {
  const { data } = useSuspenseQuery(catQueryOptions())
  const cats = data.cats as Cat[];
  console.log(cats);
return ( 
        <div className='max-w-6xl mx-auto my-4 p-2'>
            <h1 className="text-3xl dark:text-gray-100 text-gray-900">The Cat Book </h1>
            <hr className="mt-2 mb-10 text-gray-800 dark:text-gray-300"/>
            <div className="grid md:grid-cols-2 gap-10 items-center mx-auto">
                {
                    cats.map((cat:Cat) => {
                        return (
                        <CatCardHome cat={cat} key={cat.id}/>
                        )
                    })
                }
            </div>
        </div>
     );
}
