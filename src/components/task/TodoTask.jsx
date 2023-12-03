import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link,matchPath, useLocation} from "react-router-dom"
import { apiConnector } from '../../services/apiconnector';
import { fetchtask } from "../../services/operations/taskAPI" 
import TaskSubmition from "../../components/task/TaskSubmition"
const TodoTask = () => {
    const {token} = useSelector((state) =>state.auth);
    const BASE_URL =process.env.REACT_APP_BASE_URL
    const {user} = useSelector((state) => state.profile);
    const location =useLocation();
    const [task,setTask] = useState([])
    const [flag,setFlag] = useState(false)
    const [loading ,setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            //console.log(token,"token ha bhau")
            const res = await fetchtask(token);
            console.log(res,"responseeeeeeees")
            setTask(res.data.task); // Assuming response contains data
            
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
      console.log(task,"response of task")
      
      const onSubmit =(taskId) =>{
        
      }
  return (
    <div>
    
    <div className='bg-richblack-5'>
      {
          task?.map((ele,i)=>(
            <div key={i} className='text-richblack-5 ' onClick={() => onSubmit(ele?._id)}>
              {ele?.title}
            </div>
          ))
       }
    </div>
     {
      !flag && <TaskSubmition/>
     }
       

    </div>
  )
}

export default TodoTask