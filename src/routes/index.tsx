import HomePageHero from '@/components/HomePageHero';
import HowItWorks from '@/components/HowItWorks';
import SayHello from '@/components/SayHello';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import AnouncementList from '@/components/AnouncementList';
import {motion} from 'framer-motion';



const catLoaderQueryOptions = () => queryOptions({
  queryKey: ['catloader'],
  queryFn: async () => {
    const res = await fetch("/cat_profiles.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return {cats:data.cats.slice(2,4)} //We return only 2 items here, may look into changing later
  },
})


export const Route = createFileRoute('/')({
  loader: ({context:{queryClient}}) => queryClient.ensureQueryData(catLoaderQueryOptions()),
  component: HomePage,
})

function HomePage() {

  const { data } = useSuspenseQuery(catLoaderQueryOptions())
  console.log(data);
  return (
  <>
    <HomePageHero /> 
    {/* Say Hello To style={{ backgroundImage: `url(${HeroBg})` }}*/}
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <SayHello selectedCats={data.cats} />
</motion.div>    {/* How it Works */}
    <HowItWorks />
    {/* <AnouncementList /> */}
  </>
  )
}
