import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from "../../../context/ProfileContext";
import { useUser } from "../../../context/UserContext";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/profile/$userSlug/')({
  component: UserProfile,
})

// Avatar list type
const avatarList: string[] = [
  "/avatars/Cat-Brown.png",
  "/avatars/Cat-Grey.png",
  "/avatars/Cat-Orange.png",
  "/avatars/Cat-White.png",
  "/avatars/Cat-Pink.png",
  "/avatars/Cat-Latte.png",
  "/avatars/Cat-Purple.png"
];




function UserProfile ()  {
  const { user } = useUser();
  const { userSlug } = Route.useParams();
  const profile = useProfile();

  // Local state for selected avatar
  const [selectedAvatar, setSelectedAvatar] = useState<string>("/avatars/Cat-Grey.png");

  if (!user) {
    return (
      <div className="p-8 pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-md flex flex-col items-center p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Not Signed In</h2>
          <p className="mb-4 text-gray-600">Please sign in to view your profile.</p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full font-bold shadow hover:bg-blue-500 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (userSlug && userSlug !== user.username.toLowerCase()) {
    return (
      <div className="p-8 pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Profile not found</h2>
        <Link to="/profile/$userSlug" params={{ userSlug: user.username.toLowerCase() }} className="text-blue-500 underline">
          Go to your profile
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-3xl flex flex-col md:flex-row items-stretch p-0">
        {/* Left: Profile Image and Avatar Selection */}
        <div className="md:w-80 flex-shrink-0 flex flex-col justify-center items-center bg-blue-50 rounded-l-xl p-8">
          <img
            src={selectedAvatar}
            alt={userSlug}
            className="w-64 h-64 rounded-full object-cover border-4 border-blue-200 shadow mb-4"
            style={{ aspectRatio: "1 / 1" }}
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {avatarList.map((avatar, idx) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={`border-2 rounded-full p-1 transition ${
                  selectedAvatar === avatar
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-transparent"
                }`}
                aria-label={`Select avatar ${idx + 1}`}
                type="button"
              >
                <img
                  src={avatar}
                  alt={`Avatar ${idx + 1}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500 mt-2">Select your avatar</span>
        </div>
        {/* Right: Profile Info */}
        <div className="flex-1 w-full flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">{userSlug}</h2>
          <ul className="mb-4 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold text-blue-700">Profile Description:</span>
              <span className="block ml-2 text-gray-600">{profile.description}</span>
            </li>
            {profile.traits && profile.traits.length > 0 && (
              <li>
                <span className="font-semibold text-blue-700">Traits:</span>
                <ul className="list-disc ml-8 text-blue-600">
                  {profile.traits.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </li>
            )}
            {profile.favoritePlaces && profile.favoritePlaces.length > 0 && (
              <li>
                <span className="font-semibold text-blue-700">Favorite Places:</span>
                <ul className="list-disc ml-8 text-gray-600">
                  {profile.favoritePlaces.map((place, idx) => (
                    <li key={idx}>{place}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          {/* You can add a logout button here if needed */}
        </div>
      </div>
    </div>
  );
};