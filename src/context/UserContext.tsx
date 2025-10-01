import { refreshAccessToken } from "@/api/auth";
import { setStoredAccessToken } from "@/lib/authToken";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


type UserContextType = {
    accessToken: null | string;
    setAccessToken: (token: null | string) => void;
    user: {id: string; email: string; username: string; name?: string, profile:{avatar?:string|number, description:string}} | null;
    setUser: (user: UserContextType["user"]) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}:{children: ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string|null>(null); //Set access token
    const [user, setUser] = useState<UserContextType["user"]|null>(null);

    // We need to initialize the tokens somehow. Context will work once on boot up, and we will use that
    useEffect(()=>{
        const loadAuth = async () => {
            try {
                const {accessToken: newToken, user} = await refreshAccessToken()
                setAccessToken(newToken)
                setUser(user)
                setStoredAccessToken(newToken)
            } catch (err) {
                console.log("Failed to refresh token: ",err);
            }
        }
        loadAuth()
    }, [accessToken])
    //Make sure to setStoredAccessToken after accessToken in the context changes.
    //The axios api cannot access the hooks, but can access setStoredAccessToken

    useEffect(() => {
        setStoredAccessToken(accessToken)
    },[accessToken])

    // Put everything you want to make a part of the context below:
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