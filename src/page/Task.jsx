import React from 'react'
import IconBtn from '../components/common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { VscAdd } from 'react-icons/vsc'
import TodoTask from '../components/task/TodoTask'
const Task = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-3">     
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl font-medium text-richblack-5">
             MyTask
          </h1>
          <IconBtn
            text="My Task"
            onclick={() => navigate("/my-task")}
         >
            <VscAdd className="text-richblack-5" />
         </IconBtn>
          
        </div>
        <TodoTask />
       </div>
  )
}

export default Task