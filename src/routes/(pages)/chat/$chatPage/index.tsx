import MessageBox from '@/components/MessageBox';
import api from '@/lib/axios';
import type { ChatMessage, MessageRender } from '@/types';
import { queryOptions, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { IoIosSend } from "react-icons/io";

const chatPageSelectedOptions = (chatPageSlug:string) => queryOptions({
  queryKey: ["chatPageSelected", chatPageSlug],
  queryFn: async () => {
    const res = await api.get(`/messages/${chatPageSlug}`);
    return res.data;
  }
})

// $chatPage is actually the chatPage slug
export const Route = createFileRoute('/(pages)/chat/$chatPage/')({
  component: ChatPageSelectedPage,
  loader: async ({context: {queryClient}, params: {chatPage}}) => {
    return queryClient.ensureQueryData(chatPageSelectedOptions(chatPage))
  }
})

function ChatPageSelectedPage() {
  const {chatPage} = Route.useParams();
  const messages = [...useSuspenseQuery(chatPageSelectedOptions(chatPage)).data.messages].reverse()
  
  const [chatboxState, setChatboxState] = useState<string>("");
  
    // const {conversations, messages, users} = loaderData;
    console.log(messages);
  return (
  <>
  <div className="flex flex-col justify-between h-full gap-2">
    <div className="flex flex-col gap-4 p-4 overflow-y-scroll flex-1 ">
        {messages.map((message: ChatMessage) => {
          const messageRender: MessageRender = {
            userName: message.user.username,
            content: message.content,
            time: message.createdAt,
          }
          return (
            <MessageBox key={message._id} userName={messageRender.userName} time={messageRender.time} content={messageRender.content} />
          )
        })}
    </div>
    <div className=" text-center p-2 bg-neutral-50 ">
      <form className="w-lg mx-auto p-1 px-2 bg-white rounded border-2 border-neutral-300  flex gap-2 ">
        <input type='text' value={chatboxState} onChange={(e)=>setChatboxState(e.target.value)} className='flex-1 p-1 px-2 outline-0' placeholder='Type your message' ></input> <button className=' bg-green-300 rounded-sm aspect-square text-2xl p-1 text-white hover:bg-green-400 transition cursor-pointer will-change-auto'><IoIosSend/></button>
      </form>
    </div>
  </div>
  </>)
}
