import CatCardHome from '@/components/CatCardHome';
import OverlayTitle from '@/components/OverlayTitle';
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
  <>
  <OverlayTitle image="carousel/cats-hero-bg-2.jpg">
  <div className='w-full md:w-xl mx-auto  py-6 text-center'>
      <h1 className='text-white text-3xl mb-4'>The Cat Book </h1>
      <p className='text-white text-lg'>
        A living archive of the beloved felines who roam our campus, <br></br> curated with care by their human friends.
      </p>
  </div>
  </OverlayTitle>
  <div className='max-w-6xl mx-auto my-4 p-2'>
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
    </>
     );
}
