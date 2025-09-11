import type { Cat } from "@/types";
import CatCardHome from "./CatCardHome";
import { Link } from "@tanstack/react-router";


const SayHello = ({selectedCats}:{selectedCats:Cat[]}) => {
    
    return ( 
    <section className="w-full bg-neutral-50 py-10" >
        <div className="mx-auto max-w-5xl px-10 py-5 bg-white rounded-2xl shadow-md border border-gray-50">
            <h2 className="text-3xl mb-4 text-shadow-md font-semibold text-gray-800 text-center md:text-left ">Say Hello 👋 To</h2>

            <div className="grid md:grid-cols-2 gap-4 md:gap-10 items-center mx-auto mb-10">
            {selectedCats.map((cat:Cat) => {
                return (
                    <CatCardHome cat={cat} key={cat.id} />
                )
            })
            }
            </div>
            <p className="text-justify text-shadow-xs mb-5">
                Bilkent is the home of many wonderful cats. Meet our furry friends!
            </p>
            <div className="flex justify-center">
                <Link to="/cats" className="bg-blue-400 text-white hover:bg-blue-500 shadow-md hover:shadow-xl py-2 px-5 rounded text-xl">View Cat Book → </Link>
            </div>
        </div>
        
    </section>
     );
}
 
export default SayHello;