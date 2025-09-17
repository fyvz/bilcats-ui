import { createContext, useContext, useState, type ReactNode } from "react";


type UserContextType = {
    accessToken: null | string;
    setAccessToken: (token: null | string) => void;
    user: {id: string; email: string; userName: string;} | null;
    setUser: (user: UserContextType["user"]) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}:{children: ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string|null>(null); //Set access token
    const [user, setUser] = useState<UserContextType["user"]|null>(null);

    const contextContent: UserContextType = {accessToken, setAccessToken, user, setUser}
    return ( 
        <UserContext.Provider value={contextContent}>
            {children}
        </UserContext.Provider>
     );
}
 
export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}