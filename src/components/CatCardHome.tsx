import type { Cat } from "@/types";
import { Link } from "@tanstack/react-router";

const CatCardHome = ({cat}:{cat: Cat}) => {
    
    
    return ( 
        // This thing can break with opinionated w and h stuff but Idk


        <Link
        to={`/cats/${cat.slug}`}
        className="group relative block mx-auto aspect-[7/4] max-w-md overflow-hidden rounded-md bg-gray-950 shadow-md hover:shadow-lg transition"
        >
            <img
                src={`/cat-profiles/${cat.slug}.jpg`}
                alt={cat.name}
                className="block h-full w-full object-cover"  // no rounded here
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-black/50 opacity-60 group-hover:opacity-100 transition duration-200 text-white">
                <h2 className="text-2xl font-bold">{cat.name}</h2>
                <p className="text-sm">{cat.desc}</p>
            </div>
        </Link>


     );
}
 
export default CatCardHome;