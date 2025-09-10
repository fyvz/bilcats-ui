export type Cat = {
    id: number;
    slug: string;
    name: string;
    desc?: string;
    stats?: Record<string,string>;
    flairs?: string[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  username: string
};

export type Conversation = {
  id: string;
  name: string;
}

export type ChatInteraction = {
  userId: number;
  interaction: string;
};


export type ChatMessage = {
  id: number;
  conversationId: number;
  initialVersion?: string;
  content: string;
  userId: number;
  createdAt: string; // ISO string
  updatedAt?: string | null;
  deletedAt?: string | null;
  restrictedAt?: string | null;
  restrictedBy?: number | null;
  interactions?: ChatInteraction[];
};


export type MessageRender = {
    userName:  string;
    content: string;
    time: string,
    interactions?: Record<string,string> 
}

export type UserInfo = {
    id: number;  
    userName: string;
    profilePic?: string;
}
