import type { Anouncement } from '@/types'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute,  Link, Outlet } from '@tanstack/react-router'
import api from '@/lib/axios';
import AnouncementCard from '@/components/AnouncementCard';


const anouncementsQueryOptions = ()=>queryOptions({
  queryKey: ["anouncement"],
  queryFn: async () => {
    const res = await api.get("/anouncements");
    return res.data;
  }
})

export const Route = createFileRoute('/(pages)/anouncements')({
  component: AnouncementList,
  loader: async ({context: {queryClient}}) => {
     return queryClient.ensureQueryData(anouncementsQueryOptions())
  },
})

function AnouncementList() {

    const {data: anouncementsRaw} = useSuspenseQuery(anouncementsQueryOptions())
    const anouncements = [...anouncementsRaw].reverse()
    // const {conversations, messages, users} = loaderData;
    console.log(anouncements);


  return (
    <>
    <div className="overflow-auto h-full">
      <div className="h-18 sticky top-0 z-10 bg-white">
        <h1 className="text-2xl dark:text-gray-100 text-gray-900">Anouncements</h1>
        <hr className="mt-2 mb-4 text-indigo-200 "/>
      </div> 
      <div className=" flex h-full min-h-0 flex-col ">
        {anouncements.map((anouncement: Anouncement) => {
                          return (
                              <>
                              <div className="flex flex-col flex-1 min-h-0">
                                <AnouncementCard anouncement={anouncement} key={anouncement.id} />
                              </div>
                              <br />
                              <br />
                              </>
                          )
                      })}
        </div>
      </div>
    </>
  )
}
