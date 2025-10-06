import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useNavigate } from '@tanstack/react-router'
import OverlayTitle from '@/components/OverlayTitle'


// Fix leaflet's default icon paths for Vite/React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const BILKENT_CENTER: [number, number] = [39.8706, 32.7493]

// Define Cat type for better type safety
type Cat = {
  id: number;
  name: string
  breed: string
  age: number
  description: string
  img: string,
  mostVisited?: string[];
  trait?:string[];
  location: [number, number]
}

const CatMap: React.FC = () => {
  const cats : Cat[] = [
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
  ];
  const navigate = useNavigate()

  return (
    <>
          <OverlayTitle image="assets/blog-post-header-bg.jpg" overlayStyle="bg-black/30 backdrop-blur-sm">
      <div className='w-full md:w-xl mx-auto  py-6 text-center'>
          <h1 className='text-white text-3xl mb-4 text-shadow-lg text-shadow-black/30'>The Cat Map </h1>
          <p className='text-white text-lg text-shadow-lg text-shadow-black/30 mb-2'>
          The campus cat atlas — track, explore, and adore
          </p>
          {/* <div className="mt-2 rounded-2xl bg-black/50 p-4">
          
          </div> */}
      </div>
      </OverlayTitle>
    <div className="p-8 pt-24 min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center">

      <MapContainer
        center={BILKENT_CENTER}
        zoom={17}
        style={{ height: '400px', width: '100%', maxWidth: 700, zIndex: 10 }}
        scrollWheelZoom={false}
        className="mb-10 rounded-xl shadow-lg border border-amber-200"
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          />
        {cats.map((cat) => (
          <Marker key={cat.id} position={cat.location}>
            <Popup>
              <div
                className="flex flex-col items-center p-2 bg-white rounded-lg shadow border border-amber-100"
                style={{ minWidth: 120 }}
                >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-300 mb-2"
                  style={{ aspectRatio: '1 / 1' }}
                  />
                <strong className="text-amber-700">{cat.name}</strong>
                <div className="text-xs text-gray-600">
                  {cat.breed}, {cat.age} years
                </div>
                <div className="text-xs text-gray-700 text-center">
                  {cat.description}
                </div>
                <button
                  className="mt-3 px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-xs font-semibold shadow hover:bg-amber-300 transition"
                  onClick={() =>
                    navigate({
                      to: '/cats/$catNameSlug',
                      params: {
                        catNameSlug: cat.name.toLowerCase().replace(/\s+/g, '-'),
                      },
                    })
                  }
                  >
                  View Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* ...rest of your code... */}
    </div>
        </>
  )
}

export default CatMap