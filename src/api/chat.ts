import api from "@/lib/axios";


export const createChatMessage = async (newMessage : {
    content: string;
    chatPage: string;
}) => {
    const res = await api.post(`/messages/${newMessage.chatPage}`, {content: newMessage.content})
    return res.data
}