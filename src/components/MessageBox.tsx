import { useUser } from "@/context/UserContext";
import { avatarList } from "@/macros";
import type { MessageRender } from "@/types";
import { Link } from "@tanstack/react-router";



const MessageBox = ({user,time,content}:MessageRender) => {
    const {user:currentUser} = useUser()
    const isOwnMessage = user.username === currentUser?.username;
    const avatar = parseInt(user.profile.avatar as string);
    const date = new Date(time);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const hhmm = `${hh}:${mm}`;

    const wrapperStyle =
    avatarList[avatar]?.messageBoxTheme?.container ??
    "bg-white border-blue-100 shadow-blue-50";

    const avatarStyle =
    avatarList[avatar]?.messageBoxTheme?.avatarStyle ??
    "border-blue-200";


    return (
        <div className={`w-full flex ${isOwnMessage&&"flex-row-reverse"}`}>

            <div className={`${wrapperStyle}
                p-4   rounded-md border flex  cursor-pointer shadow-sm w-fit gap-4`}>
                <div className={`overflow-hidden  rounded-full  border-4 ${avatarStyle}`}>
                        <div className="h-16 w-16 aspect-square">
                        <img src={avatarList[avatar].image} alt="" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="">
                        <div className=" space-x-2">
                        <Link to="/chat" className="text-black font-semibold">@{user.username}</Link><span className="font-semibold text-neutral-600">•</span><span className="font-semibold text-neutral-400">{hhmm}</span>
                        </div>
                        <div className="text-lg">
                            {content}
                        </div>
                    </div>
                </div>
    

            </div>
        </div>

    )
}
 
export default MessageBox;