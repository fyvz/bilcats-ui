import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/(pages)/chat/')({
    head: () => ({
    meta:[
      {
        title: 'BilCats - Conversation'
      }
    ]
  }),
  component: ChatPage,
})

function ChatPage() {
      
    return ( 
      <div className="flex flex-col h-64 max-h-full items-center justify-center">
          <h2 className='font-light text-xl text-gray-400 text-shadow-sm '>Welcome to BilCats Conversations</h2>
          <p className='mt-4 text-gray-400 italic'>Select a conversation to get started.</p>
      </div>
     );
}
