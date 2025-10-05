import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import api from '@/lib/axios';
import type { Conversation } from '@/types';
import {motion} from 'framer-motion';

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

   <div className=" flex h-full min-h-0 flex-col ">

        <div className="flex flex-row flex-1 min-h-0">
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
        <motion.div className="flex-1 min-h-0  w-full  max-h-full overflow-hidden flex flex-col"   initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}>

        <Outlet />
      </motion.div>
        </div>
    </div>
    </>
)
}
