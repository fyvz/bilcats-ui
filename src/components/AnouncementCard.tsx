import type { Anouncement } from "@/types";
import { Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { Cat } from "@/types";
import CatCard from '@/components/CatCard';

const categoryColors: Record<string, string> = {
  event: "bg-green-100 text-green-700",
  info: "bg-blue-100 text-blue-700",
  emergency: "bg-red-100 text-red-700",
  update: "bg-purple-100 text-purple-700",
}
/*const catDetailQueryOptions = (catNameSlug:string) => queryOptions({
  queryKey: ['catdetail'],
  queryFn: async () => {
    const res = await fetch("/cat_profiles.json");
    if(!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    const cat = data.cats.find((cat: Cat) => cat.slug === catNameSlug);
    if(!cat) return {cat:null, exists:false, catNameSlug}
    return {cat, exists:true, catNameSlug }
  },
});*/

const AnouncementCard = ({anouncement}: {anouncement: Anouncement}) => {
  //const { data } = useSuspenseQuery(catDetailQueryOptions(anouncement.cat))

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl overflow-auto transition-transform duration-200 hover:scale-105">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <img
        src={`../../assets/thebilcat.png`}
        alt={anouncement.author.name}
        className="h-12 w-12 rounded-full"
        />
        <div>
        <p className="font-semibold">{anouncement.author.name}</p>
        <p className="text-sm text-gray-500">
          Admin · {
            (() => {
            const date = new Date(anouncement.date);
            const now = new Date();
            const diffTime = now.getTime() - date.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 0 || diffDays < 0) return "Today";
            if (diffDays === 1) return "1 day ago";
            return `${diffDays} days ago`;
            })()
          }
        </p>
        <p> </p>
        {/* Category */}
        <p
          className={`mt-3 inline-block rounded-md px-2 py-1 text-xs font-medium ${
            categoryColors[anouncement.category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {anouncement.category}
        </p>
        </div>
        
      </div>
      <div className="flex items-center gap-2 text-gray-500">
      </div>
        {/* Cat's Image Column */}
        <div className="ml-4 flex flex-col items-end justify-start">
            <img
              src={`../cat-profiles/${anouncement.cat}.jpg`}
              alt={anouncement.cat}
              className="h-20 w-20 rect-full rounded-2xl object-cover"
            />
            <p className="text-base text-gray-500 mt-2">About: {anouncement.cat}</p>
        </div>
      </div>

      {/* Body */}
      <div className="mt-3">
        <h2 className="text-lg font-bold">{anouncement.title}</h2>
        <p className="mt-2 text-gray-700">{anouncement.content}</p>
      </div>
    </div>
  )
}
export default AnouncementCard;