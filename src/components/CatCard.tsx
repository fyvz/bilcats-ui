import type { Cat } from "../types";

const CatCard = ({cat}:{cat: Cat}) => {
    
    return ( 
        // This thing can break with opinionated w and h stuff but Idk
    <div className="relative group rounded-xl cursor-pointer overflow-hidden  mx-auto max-w-md md:max-w-4xl w-full h-60 md:h-80 shadow-md hover:shadow-2xl transition">
        <img src={`/cat-profiles/${cat.slug}.jpg`} className="object-cover block h-full w-full"/>
        {/* Hover Description */}
        <div className="absolute opacity-40 group-hover:opacity-100  transition duration-200 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 z-20 text-white">
            <h2 className="text-2xl font-bold">{cat.name}</h2>
            <p className="text-sm">{cat.desc}</p>
        </div>
    </div>
     );
}
 
export default CatCard;