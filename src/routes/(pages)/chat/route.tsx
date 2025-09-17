import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import api from '@/lib/axios';
import type { Conversation } from '@/types';

const chatQueryOptions = ()=>queryOptions({
  queryKey: ["chat"],
  queryFn: async () => {
    const res = await api.get("/chatpages");
    return res.data;
  }
})




export const Route = createFileRoute('/(pages)/chat')({
  component: ChatLayout,
  loader: async ({context: {queryClient}}) => {
     return queryClient.ensureQueryData(chatQueryOptions())
  },
})

function ChatLayout() {
  
    const {data: chatPagesRaw} = useSuspenseQuery(chatQueryOptions())
    const chatPages = [...chatPagesRaw].reverse()
    // const {conversations, messages, users} = loaderData;
    console.log(chatPages);
    
  return (
    <>

   <div className="p-1  flex flex-col h-full">
        <h1 className="text-2xl dark:text-gray-100 text-gray-900">Conversations</h1>
        <hr className="mt-2 mb-4 text-indigo-200 "/>
        <div className="flex flex-row h-full flex-1">
            <div className="flex flex-col w-64 p-4 gap-4 border-r border-r-indigo-100 ">
                {chatPages.map((conversation: Conversation) => {
                    return (
                        <Link  
                        to={`/chat/$chatPage`}
                        params={{chatPage: conversation.slug}}
                        className="block border-l-2 px-2 py-1 font-lighter hover:text-blue-400 cursor-pointer" 
                        activeProps={{className: "text-blue-400 border-l-2 border-blue-400"}}
                        key={conversation._id}>
                            {conversation.title}
                        </Link>
                    )
                })}
            </div>
            {/* Chat Messages */}
            <div className=" w-full">
                <Outlet />
            </div>
        </div>
      </div>
    </>
)
}
