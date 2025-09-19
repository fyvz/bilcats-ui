import { registerUser } from '@/api/auth';
import { useUser } from '@/context/UserContext';
import type { RegisterType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})




function RegisterPage() {

    const [registerForm, setRegisterForm] = useState<RegisterType>({email:"",password:"", name:"", username:""})
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const {setUser, setAccessToken} = useUser()

    const {mutateAsync, isPending} = useMutation({
      mutationFn: registerUser,
      onSuccess: (data) => {
        setAccessToken(data.accessToken)
        setUser(data.user)
        navigate({to: "/chat"})
      },
      onError: (err:any) =>{
        setError(err.message)
      }
    })
    const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault()
      try {
        await mutateAsync(registerForm)
      } catch (err:any) {
        console.log(err.message);
      }
    }
    return (
      <>
          <form className="space-y-5 w-full md:w-sm " onSubmit={handleSubmit}>
            <div className='mx-auto flex justify-center w-full '>
                    <img src="/assets/thebilcat.png" alt="BilCats" title="BilCats Home" className="h-10 sm:h-14 md:h-16 object-cover "/>
            </div>
            <h1 className='text-center text-3xl font-bold mb-6 text-gray-800 '>Sign Up To BilCats</h1>
            {error && <p className='bg-red-100 text-red-700 px-4 py-2 rounde mb-4'>{error}</p>}
            <label className='block'>
              <span className='block  ml-2 text-lg text-shadow-2xs cursor-pointer'>Name</span>
              <span className='block mb-1  text-sm text-gray-500 italic text-shadow-2xs cursor-pointer'>Will not be displayed to others unless you allow it.</span>
              <input type="text" className='w-full text-lg text-center   border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
              value={registerForm.name}
              onChange={(e)=>setRegisterForm((prev)=>{return {...prev, name:e.target.value}})}
              placeholder='Your Name' 
              required/>
            </label>

            <label className='block'>
            <span className='block  ml-2 text-lg text-shadow-2xs cursor-pointer'>Email</span>
              <span className='block mb-1  text-sm text-gray-500 italic text-shadow-2xs cursor-pointer'>Must be a valid bilkent email. Kept private by default.</span>
               <input type="email" className='w-full text-lg  text-center  border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
              value={registerForm.email}
              onChange={(e)=>setRegisterForm((prev)=>{return {...prev, email:e.target.value}})}
              placeholder='email@example.com' 
              required/>
            </label>

            <label className='block'>
            <span className='block  ml-2 text-lg text-shadow-2xs cursor-pointer'>User Name</span>
              <span className='block mb-1  text-sm text-gray-500 italic text-shadow-2xs cursor-pointer'>Will be displayed to others.</span>
               <input type="text" className='w-full text-lg  text-center  border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
              value={registerForm.username}
              onChange={(e)=>setRegisterForm((prev)=>{return {...prev, username:e.target.value}})}
              placeholder='KittyFan777' 
              required/>
            </label>

  
            <label className='block'>
              <span className='block mb-1 ml-2 text-lg text-shadow-2xs cursor-pointer'>Password</span>
              <input type="password" className='w-full text-lg  text-center border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
              value={registerForm.password}
              onChange={(e)=>setRegisterForm((prev)=>{return {...prev, password:e.target.value}})}
              placeholder='●●●●●●●●●' 
              required/>
            </label>
  
            <button 
            type="submit" 
            className='block p-2 px-12 w-fit mx-auto rounded text-white bg-blue-500'
            disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="border-t-2 border-gray-400 pt-4 w-full ">
            <p className='w-full text-center text-shadow-2xs mb-2'>Already have an account? </p>
            <Link to='/login' className='block mx-auto w-fit text-blue-500 font-semibold'>Sign in instead →</Link>
          </div>
      </>
    )
}
