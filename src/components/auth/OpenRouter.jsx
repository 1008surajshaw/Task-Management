import React from 'react'
import Signup from '../../page/Signup'
import Login from '../../page/Login'
import IconBtn from '../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc'


 function OpenRouter(){
  const navigate = useNavigate()
  return (
    <div className="h-screen flex flex-col justify-center text-center ">
      <div className="w-full h-[60%] flex flex-col bg-black text-white  items-center justify-center">
        <div className='flex flex-col space-y w-10/12'>
          <h1 className='font-bold text-7xl mb-3'>Task Management App</h1>
          <h3 className='mt-10 text-sm font-thin'>The task management app includes a robust Admin-Employee Invitation System, 
          allowing administrators to invite employees securely, a detailed Profile Section 
          for users to manage personal information, comprehensive Task Status Tracking to 
          monitor progress, seamless Task Submission for users and team leaders, and an 
          integrated Team Collaboration and Chat feature for effective communication 
          among team members.
          </h3>
        </div>
      </div>
      <div className="w-full h-[40%] bg-white flex flex-col items-center justify-center">
       <div className='flex justify-center'>
      <div className='mr-10'>

       <IconBtn text="Login" 
         onclick ={() =>navigate("/login")}>
          <VscAdd className="text-richblack-5 " />
       </IconBtn>
      </div>
      <div className='ml-10'>

       <IconBtn text="signUp"
       onclick ={() =>navigate("/signup")}
       >
        <VscAdd className="text-richblack-5" />
       </IconBtn>
      </div>

       </div>
      </div>
    </div>
  );
}
export default OpenRouter