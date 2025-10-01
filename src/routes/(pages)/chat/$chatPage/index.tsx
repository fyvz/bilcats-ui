import { createChatMessage } from '@/api/chat';
import MessageBox from '@/components/MessageBox';
import api from '@/lib/axios';
import type { ChatMessage, MessageRender } from '@/types';
import { queryOptions, useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
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
  const [typedMessage, setTypedMessage] = useState<string>("");
  //Fetch with TanStack
  const queryClient = useQueryClient();
  const queryClientSuspense = useSuspenseQuery(chatPageSelectedOptions(chatPage))
  const messages = [...queryClientSuspense.data.messages].reverse()
  
  const {mutateAsync, isPending} = useMutation({
    mutationFn: createChatMessage,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ["chatPageSelected", chatPage] })
    }
  })


  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!typedMessage.trim()){
      return
    }
    try {
      await mutateAsync({
        content: typedMessage.trim(),
        chatPage: chatPage
      })
      setTypedMessage("")
    } catch (err) {
      console.log(err);
      alert("Failed to create message!");
    }
  }
  
    // const {conversations, messages, users} = loaderData;
    // console.log(messages);
  return (
  <>
  <div className="flex flex-1 min-h-0 flex-col justify-between gap-2">


    <div className="flex-1 min-h-0 flex flex-col gap-2 p-4 overflow-y-scroll">
      {messages.map((message: ChatMessage) => {
      const messageRender: MessageRender = {
        user: message.user,
        content: message.content,
        time: message.createdAt,
        
      }
      return (
        <MessageBox key={message._id} user={messageRender.user} time={messageRender.time} content={messageRender.content} />
      )
    })}
    </div>
    <div className="text-center p-2 bg-neutral-50 h-16">
      <form 
      onSubmit={handleSubmit}
      className="w-lg mx-auto p-1 px-2 bg-white rounded border-2 border-neutral-300  flex gap-2 ">
        <input type='text' value={typedMessage} onChange={(e)=>setTypedMessage(e.target.value)} className='flex-1 p-1 px-2 outline-0' placeholder='Type your message' ></input> <button className=' bg-green-300 rounded-sm aspect-square text-2xl p-1 text-white hover:bg-green-400 transition cursor-pointer will-change-auto'><IoIosSend/></button>
      </form>
    </div>
  </div>
  </>)
}
