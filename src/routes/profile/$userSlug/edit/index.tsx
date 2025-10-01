import { profileEdit, profileView } from '@/api/profile';
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { avatarList } from '@/macros';
import { GiCardDiscard } from "react-icons/gi";
import { FaRegSave } from "react-icons/fa";

const profileOptions = (username:string) => queryOptions({
  queryKey: ['profile', username],
  queryFn: async () => {
    return await profileView(username)
  }
})



export const Route = createFileRoute('/profile/$userSlug/edit/')({
  component: EditProfile,
    loader: async ({context:{queryClient}, params:{userSlug}})=>{
    return queryClient.ensureQueryData(profileOptions(userSlug))
  }
})

function EditProfile() {
    const navigate = useNavigate()
    //Fetch the profile
    const username = Route.useParams().userSlug;
    const {data:profileData} = useSuspenseQuery(profileOptions(username))

    const {ownProfile, user:{profile: userProfile}} = profileData
    let {avatar, description} = userProfile;
    avatar = parseInt(avatar)

    //Leave if not own profile
    if(!ownProfile){
        navigate({to: "/profile/$userSlug", params:{userSlug: username}})
        return <></>
    } 
    
    // Local state for selected avatar
    const [selectedAvatar, setSelectedAvatar] = useState<Number>(avatar);
    const [profileDescription, setProfileDescription] = useState<String>(description);

    //Configure the form mutation:
    const {mutateAsync, isPending} = useMutation({
        mutationFn: profileEdit,
        onSuccess: (data)=>{
            navigate({to: "/profile/$userSlug", params:{userSlug: username}})
        },
        onError: (err)=>{
            alert("Failed to save profile!")
        }
    })
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        try {
            await mutateAsync({
                username: username,
                avatar: selectedAvatar.toString(),
                description: profileDescription as string
            })
        } catch (error) {
            console.log(error);
            alert("Failed to update profile!");
        }
    }
  return (
    <div className="p-8 pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-3xl flex flex-col md:flex-row items-stretch p-0">
        {/* Left: Profile Image and Avatar Selection */}
        <div className="md:w-80 flex-shrink-0 flex flex-col justify-center items-center bg-blue-50 rounded-l-xl p-8">
          <img
            src={avatarList[selectedAvatar as number].image}
            alt={username}
            className="w-64 h-64 rounded-full object-cover border-4 border-blue-200 shadow mb-4"
            style={{ aspectRatio: "1 / 1" }}
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {avatarList.map((avatar, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAvatar(idx)}
                className={`border-2 cursor-pointer rounded-full p-1 transition ${
                  idx === selectedAvatar
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-transparent"
                }`}
                aria-label={`Select avatar ${idx + 1}`}
                type="button"
              >
                <img
                  src={avatar.image}
                  alt={`Avatar ${idx + 1}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500 mt-2">Select your avatar</span>
        </div>
        {/* Right: Profile Info */}
        <form className="flex-1 w-full flex flex-col justify-center p-8 relative" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-4 text-blue-800">{username}</h2>
          <ul className="mb-4 space-y-2 text-gray-700">
            <li>
              <div className="font-semibold text-blue-700">Profile Description:</div>
              <textarea value={profileDescription as string} onChange={(e)=>{setProfileDescription(e.target.value)}} className='w-full border-2  border-blue-100 bg-blue-50 outline-0'/>
            </li>
       
              <li>
                <span className="font-semibold text-blue-700">Avatar Traits:</span>
                <ul className="list-disc ml-8 text-blue-600">
                  {avatarList[selectedAvatar as number].traits.map((t:string, idx:Number) => (
                    <li key={idx.toString()}>{t}</li>
                  ))}
                </ul>
              </li>

        
              <li>
                <span className="font-semibold text-blue-700">Avatar's Favorite Places:</span>
                <ul className="list-disc ml-8 text-gray-600">
                  {avatarList[selectedAvatar as number].favoritePlaces.map((t:string, idx:Number) => (
                    <li key={idx.toString()}>{t}</li>
                  ))}
                </ul>
              </li>

          </ul>

        <div className='absolute top-2 right-4 flex gap-2 flex-row-reverse'>
            <button type='submit' className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"><FaRegSave /> Save </button>
            <Link to="/profile/$userSlug" params={{userSlug: username}} className="text-red-600 hover:text-red-800 flex items-center gap-1"><GiCardDiscard /> Discard </Link>
        </div>
        <button type='submit' className='py-2 px-4 transition bg-blue-400 text-white rounded-lg hover:bg-blue-500 w-fit block mx-auto cursor-pointer'>Save Changes</button>

          {/* You can add a logout button here if needed */}
        </form>
      </div>
    </div>
  )
}
