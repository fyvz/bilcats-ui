
const HowItWorks = () => {
    const HowImg1 = "/assets/how-1.jpg";
    const HowImg2 = "/assets/how-2.jpg";
    const HowImg3 = "/assets/how-3.jpg";

    return (  
    <div className="bg-linear-to-br from-amber-400 to-amber-500 py-6 px-10 text-center">
        <h2 className="uppercase font-semibold text-2xl text-neutral-100 text-shadow-md border-b-2 border-white/20 mx-auto px-4 w-fit">How It Works</h2>
        {/* Flex Container */}
        <div className="flex flex-col max-w-2xl items-center mx-auto my-6 space-y-4 divide-y-2 divide-white/20">
            <div className="flex items-center justify-center gap-10 flex-col md:flex-row p-4">
                <div className="text-justify text-white text-shadow-md">
                    <h2 className="font-semibold">Discover & Track</h2>
                    <p>Explore cats around campus and see who’s nearby, needs help, or is up for adoption.</p>
                </div>
                <img src={HowImg1} className="h-44 aspect-[3/2] object-cover rounded-xl shadow-md " alt="How It Works 1" />
            </div>
            <div className="flex md:flex-row-reverse items-center justify-center gap-10 flex-col p-4">
                <div className="text-justify text-white text-shadow-md">
                    <h2 className="font-semibold">Adopt or Sponsor</h2>
                    <p>Give a kitty a loving home — or fund food, shelter, and vet visits right here on campus.</p>
                </div>
                <img src={HowImg2} className="h-44 aspect-[3/2] object-cover rounded-xl shadow-md " alt="How It Works 2" />
            </div>
            <div className="flex flex-col items-center justify-center  gap-10 md:flex-row p-4">
                <div className="text-justify text-white text-shadow-md">
                    <h2 className="font-semibold">Collaborate, Chat & Share</h2>
                    <p>Team up with students to feed, build cat houses, coordinate vet runs, and cultivate solidarity and friendship.</p>
                </div>
                <img src={HowImg3} className="h-44 aspect-[3/2] object-cover rounded-xl shadow-md " alt="How It Works 3" />
            </div>
        </div>
    </div>
    );
}
 
export default HowItWorks