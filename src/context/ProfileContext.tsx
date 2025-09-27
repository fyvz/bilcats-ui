import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Define the profile type
export interface Profile {
  img: string;
  description: string;
  traits: string[];
  favoritePlaces: string[];
}

// Context type
type ProfileContextType = Profile;

// Create the context with undefined as initial value
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Custom hook with error handling
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

// Provider with children typed
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  // Static user profile data for now
  const [profile] = useState<Profile>({
    img: "/default-profile.png",
    description: "BilCats enthusiast and cat lover. Loves to explore the campus and meet new feline friends!",
    traits: [
      "Always carries cat treats 🐾",
      "Knows every cat on campus 😺",
      "Enjoys reading in the library 📚"
    ],
    favoritePlaces: ["Main Cafeteria", "Library", "EE Building"]
  });

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};