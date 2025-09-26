import type { Anouncement } from "@/types";
import { Link } from "@tanstack/react-router";

const categoryColors: Record<string, string> = {
  event: "bg-green-100 text-green-700",
  info: "bg-blue-100 text-blue-700",
  emergency: "bg-red-100 text-red-700",
  update: "bg-purple-100 text-purple-700",
}

const AnouncementCard = ({anouncement}: {anouncement: Anouncement}) => {
  return (
    <div className="rounded-xl border-1 border-gray-300 bg-white p-4 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={anouncement.author.avatarUrl}
            alt={anouncement.author.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{anouncement.author.name}</p>
            <p className="text-sm text-gray-500">Admin · {anouncement.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
        </div>
      </div>

      {/* Category */}
      <p
        className={`mt-3 inline-block rounded-md px-2 py-1 text-xs font-medium ${
            categoryColors[anouncement.category] || "bg-gray-100 text-gray-700"
        }`}
        >
        {anouncement.category}
    </p>

      {/* Body */}
      <div className="mt-3">
        <h2 className="text-lg font-bold">{anouncement.title}</h2>
        <p className="mt-2 text-gray-700">{anouncement.content}</p>
      </div>
    </div>
  )
}

export default AnouncementCard;
