import { useUser } from "@/context/UserContext";
import type { MessageRender } from "@/types";
import { Link } from "@tanstack/react-router";



const MessageBox = ({userName,time,content}:MessageRender) => {
    const {user} = useUser()
    const isOwnMessage = userName === user?.username;
    const date = new Date(time);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const hhmm = `${hh}:${mm}`;

    return (
        <div className={`w-full flex ${isOwnMessage&&"flex-row-reverse"}`}>
            <div className={`${isOwnMessage ? "bg-lime-50" : ("bg-white")}  p-4  rounded-md border border-indigo-100 flex flex-col hover:bg-amber-100 cursor-pointer shadow-sm shadow-indigo-50  w-fit`}>
                <div className=" space-x-2">
                <Link to="/chat" className="text-blue-600 font-semibold">@{userName}</Link><span className="font-semibold text-neutral-600">•</span><span className="font-semibold text-neutral-400">{hhmm}</span>
                </div>
                <div className="text-lg">
                    {content}
                </div>
            </div>
        </div>

    )
}
 
export default MessageBox;