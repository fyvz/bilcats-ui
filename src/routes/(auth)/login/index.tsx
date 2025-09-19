import { loginUser } from '@/api/auth';
import { useUser } from '@/context/UserContext';
import type { LoginType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})



function LoginPage() {

  const [loginForm, setLoginForm] = useState<LoginType>({email:"",password:""})
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const {setUser, setAccessToken} = useUser()

  const {mutateAsync, isPending} = useMutation({
      mutationFn: loginUser,
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
      setError("")
      try {
        await mutateAsync(loginForm)
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
          <h1 className='text-center text-3xl font-bold mb-6 text-gray-800 '>Sign In To BilCats</h1>
          <label className='block'>
            <span className='block mb-1 ml-2 text-lg text-shadow-2xs cursor-pointer '>Email</span>
            <input type="email" className='w-full text-lg  text-center  border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
            value={loginForm.email}
            onChange={(e)=>setLoginForm((prev)=>{return {...prev, email:e.target.value}})}
            placeholder='email@example.com' 
            required/>
          </label>

          <label className='block'>
            <span className='block mb-1 ml-2 text-lg text-shadow-2xs cursor-pointer'>Password</span>
            <input type="password" className='w-full text-lg text-center border border-gray-400 py-2 px-2 rounded outline-0 focus:border-blue-400 focus:text-blue-600' 
            value={loginForm.password}
            onChange={(e)=>setLoginForm((prev)=>{return {...prev, password:e.target.value}})}
            placeholder='●●●●●●●●●' 
            required/>
          </label>

          <button 
          type="submit" 
          className='block p-2 px-12 w-fit mx-auto rounded text-white bg-blue-500 '
          disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="border-t-2 border-gray-400 pt-4 w-full ">
          <p className='w-full text-center text-shadow-2xs mb-2'>Don't have an account? </p>
          <Link to='/register' className='block mx-auto w-fit text-blue-500 font-semibold'>Sign up instead →</Link>
        </div>
    </>
  )
}
