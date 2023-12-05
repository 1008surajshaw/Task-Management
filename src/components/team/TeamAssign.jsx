import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link,matchPath, useLocation} from "react-router-dom"
import { apiConnector } from '../../services/apiconnector';
import { fetchtask } from "../../services/operations/taskAPI" 
import TaskSubmition from "../../components/task/TaskSubmition"
import EmptyData from './EmptyData';
import TeamForm from './TeamForm';
import CreateTeam from './CreateTeam';
const TeamAssign = () => {
    const {token} = useSelector((state) =>state.auth);
  
    const [task,setTask] = useState([])
   
    const [loading ,setLoading] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            //console.log(token,"token ha bhau")
            const res = await fetchtask(token);
            console.log(res,"responseeeeeeees")
            setTask(res.data.teamTasks); // Assuming response contains data
            
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, [token]);
      const onSubmit = (taskId) => {
        setSelectedTaskId(taskId);
      };
      console.log(task,"ttttttaaaaaaaaaaaaa")
  return (
    <div className='flex flex-col text-richblack-25 m-3 p-3'>
        <h1 className='text-2xl '>Select team to contribute to them</h1>
        <div className='bg-richblack-100 text-richblack-800 text-2xl'>
      {
          task?.map((ele,i)=>(
            <div key={i} className='text-richblack-900 p-3 cursor-pointer ' onClick={() => onSubmit(ele?._id)}>
              {ele?.name}
            </div>
          ))
       }
       </div>
       {selectedTaskId && <TaskSubmition taskId={selectedTaskId} />}
    {/* <div>
       <TeamForm />
    </div> */}
     {/* {
      task.length >1 && <TaskSubmition/>
     } */}
     {
        task.length === 0 && 
       <EmptyData/>
     }
       {/* <CreateTeam/> */}
    </div>
  )
}

export default TeamAssign