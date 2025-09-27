import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Type for a cat
export interface Cat {
  id: number;
  name: string;
  img: string;
  age: number;
  breed: string;
  description: string;
  trait: string[];
  mostVisited: string[];
  location: [number, number];
}

// Context type
interface CatContextType {
  cats: Cat[];
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const useCats = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCats must be used within a CatProvider");
  }
  return context;
};

export const CatProvider = ({ children }: { children: ReactNode }) => {
  // Static data for now; replace with API call later
  const [cats] = useState<Cat[]>([
    {
      id: 1,
      name: "Cevher Pasa",
      img: "/cat-profiles/cevher-pasa.jpg",
      age: 2,
      breed: "British Shorthair",
      description: "Playful and loves to nap in the sun.",
      trait: [
        "Loves chasing laser pointers 🐾",
        "Enjoys sunbathing by the window ☀️",
        "Greets everyone at the cafeteria entrance 😺",
      ],
      mostVisited: ["EE Building", "Main Cafeteria", "Library"],
      location: [39.8710, 32.7497],
    },
    {
      id: 2,
      name: "Latte",
      img: "/cat-profiles/latte.jpg",
      age: 3,
      breed: "Siamese",
      description: "Curious and very talkative.",
      trait: [
        "Loves chasing laser pointers 🐾",
        "Enjoys sunbathing by the window ☀️",
        "Greets everyone at the cafeteria entrance 😺",
      ],
      mostVisited: ["EE Building", "Main Cafeteria", "Library"],
      location: [39.8702, 32.7488],
    },
    {
      id: 3,
      name: "Damat",
      img: "/cat-profiles/damat.jpg",
      age: 1,
      breed: "Maine Coon",
      description: "Gentle giant who loves cuddles.",
      trait: [
        "Loves chasing laser pointers 🐾",
        "Enjoys sunbathing by the window ☀️",
        "Greets everyone at the cafeteria entrance 😺",
      ],
      mostVisited: ["EE Building", "Main Cafeteria", "Library"],
      location: [39.8708, 32.7502],
    },
  ]);

  return (
    <CatContext.Provider value={{ cats }}>
      {children}
    </CatContext.Provider>
  );
};