import { createFileRoute } from '@tanstack/react-router';
import { Link } from "@tanstack/react-router";
import { avatarList } from '@/macros';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { profileView } from '@/api/profile';
import { FaUserEdit } from "react-icons/fa";

const profileOptions = (username:string) => queryOptions({
  queryKey: ['profile', username],
  queryFn: async () => {
    return await profileView(username)
  }
})



export const Route = createFileRoute('/profile/$userSlug/')({
  component: UserProfile,
  loader: async ({context:{queryClient}, params:{userSlug}})=>{
    return queryClient.ensureQueryData(profileOptions(userSlug))
  }
})



function UserProfile ()  {
  //Fetch the profile
  const username = Route.useParams().userSlug;
  const {data:profileData} = useSuspenseQuery(profileOptions(username))
  console.log(profileData);

  const {ownProfile, user:{profile: userProfile}} = profileData
  let {avatar, description} = userProfile;
  avatar = parseInt(avatar)


  // Local state for selected avatar




  return (
    <div className="p-8 pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-3xl flex flex-col md:flex-row items-stretch p-0">
        {/* Left: Profile Image and Avatar Selection */}
        <div className="md:w-80 flex-shrink-0 flex flex-col justify-center items-center bg-blue-50 rounded-l-xl p-8">
          <img
            src={avatarList[avatar as number].image}
            alt={username}
            className="w-64 h-64 rounded-full object-cover border-4 border-blue-200 shadow mb-4"
            style={{ aspectRatio: "1 / 1" }}
          />

        </div>
        {/* Right: Profile Info */}
        <div className="flex-1 w-full flex flex-col justify-center p-8 relative">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">{username}</h2>
          <ul className="mb-4 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold text-blue-700">Profile Description:</span>
              <span className="block ml-2 text-gray-600">{description}</span>
            </li>
       
              <li>
                <span className="font-semibold text-blue-700">Avatar Traits:</span>
                <ul className="list-disc ml-8 text-blue-600">
                  {avatarList[avatar as number].traits.map((t:string, idx:Number) => (
                    <li key={idx.toString()}>{t}</li>
                  ))}
                </ul>
              </li>

        
              <li>
                <span className="font-semibold text-blue-700">Avatar's Favorite Places:</span>
                <ul className="list-disc ml-8 text-gray-600">
                  {avatarList[avatar as number].favoritePlaces.map((t:string, idx:Number) => (
                    <li key={idx.toString()}>{t}</li>
                  ))}
                </ul>
              </li>

          </ul>
              { ownProfile &&
                <div className='absolute top-2 right-4'>
                  <Link to="/profile/$userSlug/edit" params={{userSlug: username}} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><FaUserEdit /> Edit</Link>
                </div>

              }
          {/* You can add a logout button here if needed */}
        </div>
      </div>
    </div>
  );
};