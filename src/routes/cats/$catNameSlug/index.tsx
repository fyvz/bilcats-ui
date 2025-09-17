import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Cat } from '@/types'

const catDetailQueryOptions = (catNameSlug:string) => queryOptions({
  queryKey: ['catdetail'],
  queryFn: async () => {
    const res = await fetch("/cat_profiles.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const cat = data.cats.find((cat: Cat) => cat.slug === catNameSlug);
    if(!cat) return {cat:null, exists:false, catNameSlug}
    return {cat, exists:true, catNameSlug }
  },
})

export const Route = createFileRoute('/cats/$catNameSlug/')({
  component: CatDetailPage,
  loader: async ({params,context:{queryClient}}) => {
    return queryClient.ensureQueryData(catDetailQueryOptions(params.catNameSlug))
  }
})


function CatDetailPage() {
  const {catNameSlug} = Route.useParams();
  const { data } = useSuspenseQuery(catDetailQueryOptions(catNameSlug))
  const {cat, exists} = data;
  if(!exists) return (
  <>
  <div className="bg-white  border-gray-100 text-gray-900 dark:bg-gray-700 dark:border-gray-700 dark:text-white  p-4 rounded-xl shadow-sm border w-full sm:w-auto sm:max-w-md  sm:mx-auto flex flex-col items-center gap-2 ">
  <h1 className="text-3xl">Cat's Not On the Roster</h1>
  <p className="font-semibold my-2 text-gray-600 dark:text-gray-200">This cat does not currently exist in our directory.</p>
    <Link to="/" className="py-3 px-8 font-semibold w-52 text-center  bg-blue-400 text-white hover:bg-blue-500 mx-auto rounded-xl shadow-md flex justify-between"><span>←</span><span>Back to Home</span> </Link>
  <Link to="/cats" className="py-3 px-8 font-semibold w-52 text-center  bg-amber-400 text-white hover:bg-orange-400 mx-auto rounded-xl shadow-md flex justify-between"><span>←</span><span>Back to Cat Book</span></Link>

  </div>
  </>
  )
  
  console.log(data);

    return (  
        <>
    
        <h1 className="text-3xl mb-1">{cat.name}</h1>
        <hr className="border-gray-400"/>
        <div className="flex flex-col items-center lg:flex-row lg:justify-center py-2  gap-2 lg:gap-4">
            <img src={`/cat-profiles/${cat.slug}.jpg`} alt={cat.name} className="h-64 w-96 lg:w-auto object-cover rounded-2xl shadow-md aspect-[3/2] float-start mx-2 my-2"/>
            <div className="max-h-64 overflow-y-scroll px-4 w-full">
            <div className="flex justify-center ">
                <div className="divide-y-1 w-full divide-gray-400 space-y-2 ">
                    {cat.stats?Object.entries(cat.stats as Record<string, string>).map(([key, value]) => (
                    <div key={key} className="flex justify-between  pb-1">
                        <span className="font-semibold capitalize mr-4 text-sm sm:text-base">{key.replace(/_/g, " ")}:</span>
                        <span className="text-sm sm:text-base">{value}</span>
                    </div>
                    )):(cat.desc ? cat.desc : "No description available.")}
                </div>
            </div>
            </div>

        </div>
  

        </>
    );
}
