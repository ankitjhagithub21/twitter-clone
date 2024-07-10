import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCurrUser } from '../redux/slices/userSlice'
import Loader from '../components/Loader'

const Register = () => {
    const dispatch = useDispatch()
    const initialData = {
        fullName:"",
        username:"",
        email:"",
        password:""
    }
    const [userData,setUserData] = useState(initialData)
    const [loading,setLoading] = useState(false)
    const [isLogin,setIsLogin] = useState(false)

    const handleChange = (e) =>{
        const {name,value} = e.target;


        setUserData({
            ...userData,
            [name]:value
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(loading) return;
        try{
            setLoading(true)
            const res = await fetch(`/api/auth/${isLogin ? 'login':'register'}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify(userData)
            })
            const data = await res.json()
            if(data.success){
                setUserData(initialData)
                toast.success(data.message)
                dispatch(setCurrUser(data.user))
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error("Something went wrong.")
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }
    
  return (
    <section>
        <div className='container p-5 lg:p-0 mx-auto flex flex-wrap min-h-screen w-full md:items-center'>
            <div className='lg:w-1/2  w-full flex items-center md:justify-center justify-start'>
                <img src="./twitter.png" alt="logo"  />
            </div>
            <div className='lg:w-1/2 w-full flex flex-col'>
               {
                isLogin ? <h2 className='mb-5 font-bold text-3xl'>Sign in to X</h2> : <>
                 <h1 className='text-5xl font-bold mb-10'>Happening now</h1>
                 <h2 className='text-3xl font-bold mb-5'>Join Today.</h2>
                </>
               }
                <form className='flex flex-col gap-2 text-gray-800 text-sm lg:w-1/2 w-full' onSubmit={handleSubmit}>
                 {
                    !isLogin && <>
                    
                    <input type="text" name='fullName' className=' px-4 py-2  rounded-full bg-white' placeholder='Enter your name' onChange={handleChange}   required/>
                    <input type="text" name='username' className='px-4 py-2 rounded-full bg-white' placeholder='Enter your username' onChange={handleChange}  required/>

                    </>
                 }
                    <input type="email" name='email' className='px-4 py-2 rounded-full bg-white' placeholder='Enter your email' onChange={handleChange}  required/>
                    <input type="password" name='password' className='px-4 py-2 rounded-full bg-white' placeholder='Enter your password' onChange={handleChange}  required/>
                    <button className='bg-[#1D9BF0] text-white rounded-full px-4 py-2  font-semibold' type='submit'>
                       
                        {loading ? <Loader/> : `${isLogin ? 'Sign in' :'Create Account'}`}
                    </button>
                   
                </form>
                <p className='text-white my-2 text-md font-bold'>
                    {
                        isLogin ? "Don't have an account?" : "Already have an account?"
                    }
                </p>
             {
                isLogin ?  <button type='button' className='border text-[#1D9BF0] px-4 py-2 rounded-full hover:bg-[#031018] lg:w-1/2  w-full' onClick={()=>setIsLogin(false)}>Sign Up </button> :  <button type='button' className='border text-[#1D9BF0] px-4 py-2 rounded-full hover:bg-[#031018] lg:w-1/2 w-full' onClick={()=>setIsLogin(true)}>Sign in </button>
             }
            </div>
        </div>
    </section>
  )
}

export default Register
