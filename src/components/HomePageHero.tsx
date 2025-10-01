
import { Link } from "@tanstack/react-router";

const HomePageHero = () => {
    const HeroBg = "/assets/hero_bg.jpg";
    const HeroImg = "/assets/hero_image.png";
    return ( 
    <div
    className="h-auto bg-cover bg-center p-6 py-6 md:py-2 space-y-4 md:space-y-0 flex flex-col justify-center items-center md:space-x-20 md:flex-row md:h-100"
    style={{ backgroundImage: `url(${HeroBg})` }}
    >
        <div className="max-w-md w-fit">
            <h1 className="font-bold text-4xl text-shadow-sm leading-10">
                <span className="text-sky-400">EVERY CAT</span><br />
                <span className="text-emerald-400">DESERVES</span><br />
                <span className="text-orange-400">A CAMPUS HERO</span>
            </h1>

            <p className="mt-6 leading-8 font-medium text-shadow-sm text-lg">
                Discover. Adopt. Support. <br />
                Become the hero your Bilkenter furballs need.
            </p>

            <div className="space-x-6 flex flex-row items-center mt-4">
                <Link to="/login">
                <button className="w-30 py-2 px-4 bg-sky-400 rounded text-white text-shadow-md shadow-md transition-colors hover:bg-sky-600 cursor-pointer duration-100 ease-in">
                Sign In
                </button>
                </Link>
                <p>or</p>
                <Link to="/register">
                    <button className="w-30 py-2 px-4 bg-orange-500 rounded text-white shadow-md text-shadow-md transition-colors hover:bg-orange-600 cursor-pointer duration-100 ease-in">
                        Join Us
                    </button>
                </Link>
            </div>
        </div>
        <div className="">
            <img src={HeroImg} alt="BilCats" className="w-full max-w-md md:max-w-lg object-cover" />
        </div>
    </div>
     );
}
 
export default HomePageHero;