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
  _id: string;
  title: string;
  slug: string;
}

export type ChatInteraction = {
  userId: number;
  interaction: string;
};


export type ChatMessage = {
  _id: string;
  content: string;
  user: UserInfo;
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
    _id: string;  
    username: string;
    profilePic?: string;
}


export type RegisterType = {
  name: string;
  email: string;
  username: string;
  password: string;
}


export type LoginType = {
  email: string;
  password: string;
}
