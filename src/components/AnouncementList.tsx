import type { Anouncement } from '@/types'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import AnouncementCard from '@/components/AnouncementCard';
import { useUser } from '@/context/UserContext';
import { Link } from '@tanstack/react-router';

// const anouncementsQueryOptions = ()=>queryOptions({
//   queryKey: ["anouncement"],
//   queryFn: async () => {
//     const res = await api.get("/anouncements");
//     return res.data;
//   }
// })

function AnouncementList() {
    const {user} = useUser();
    const isAdmin = user?.username === "admin";
    // const {data: anouncementsRaw} = useSuspenseQuery(anouncementsQueryOptions())
    // const anouncements = [...anouncementsRaw]
const anouncements = [
{
  id:1,
  "_id": {
    "$oid": "68d6791a0091989aaebb2769"
  },
  "author": 1,
  "cat": "cevher-pasa",
  "category": "info",
  "title": "Welcome to Bilcats!",
  "content": "This is your first anouncement. This is your first anouncement. This is your first anouncement. This is your first anouncement.",
  "following": 0,
  "date": {
    "$date": "2025-09-26T12:00:00.000Z"
  },
},
{
    id:2,
  "_id": {
    "$oid": "68d679470091989aaebb276b"
  },
  "author": 1,
  "cat": "kofte",
  "category": "info",
  "title": "Welcome to Bilcats!",
  "content": "This is your anouncement.",
  "following": 0,
  "date": {
    "$date": "2025-09-20T12:00:00.000Z"
  }
},
{
    id:3,
  "_id": {
    "$oid": "68d6797e0091989aaebb276d"
  },
  "author": 1,
  "cat": "latte",
  "category": "info",
  "title": "Welcome to Bilcats!",
  "content": "This is your first anouncement.",
  "following": 0,
  "date": {
    "$date": "2025-09-26T12:00:00.000Z"
  }
},
{
    id:4,
  "_id": {
    "$oid": "68d679900091989aaebb276f"
  },
  "author": 1,
  "cat": "firuzan",
  "category": "emergency",
  "title": "Welcome to Bilcats!",
  "content": "This is your first anouncement.",
  "following": 0,
  "date": {
    "$date": "2025-09-23T12:00:00.000Z"
  }
},

]

  return (
    <>
    <section className="w-full bg-neutral-50 py-10" >

    <div className="mx-auto max-w-7xl px-10 py-8 bg-white rounded-2xl shadow-md border border-gray-50 flex justify-center h-165">
      <div className="overflow-auto h-full">
        <div className="h-15 flex justify-between sticky top-0 z-10 bg-white">
          <h2 className="text-3xl mb-4 text-shadow-md font-semibold text-gray-800 text-center md:text-left ">Anouncements 📣 </h2>
          {isAdmin && (
            <div className="h-120vh justify-center">
                <Link to="/admin/post-anouncement" className="bg-blue-400 text-white hover:bg-blue-500 shadow-md hover:shadow-xl py-2 px-5 text-xl rounded">Post Anouncement → </Link>
            </div>
          )}
        </div> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          {anouncements.map((anouncement: Anouncement) => (
            <AnouncementCard anouncement={anouncement} key={anouncement.id} />
          ))}
        </div>
      </div>
      </div>
      </section>
    </>
  )
}
export default AnouncementList;
