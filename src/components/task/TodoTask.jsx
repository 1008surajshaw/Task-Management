import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchtask } from '../../services/operations/taskAPI';
import TaskSubmition from '../../components/task/TaskSubmition';

const TodoTask = () => {
  const { token } = useSelector((state) => state.auth);
  const [task, setTask] = useState([]);
  const [uncomplete, setUnComplete] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchtask(token);
        const data = res.data.task;
        const completedTasks = data.filter((task) => task.completed === true);
        const uncompletedTasks = data.filter((task) => task.completed === false);

        setTask(completedTasks);
        setUnComplete(uncompletedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [token]);
  useEffect(() =>{

  },[])
  const onSubmit = (taskId) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div className='flex flex-col text-richblack-25'>
    <h1 className=''>To Submit your response click on the task you want to submit</h1>
    <div className='flex flex-row justify-between'>
      <div className='bg-caribbeangreen-500'>
        {/* Completed tasks */}
        <h1 className='text-2xl'>Task which are not completed</h1>
        {task?.map((ele, i) => (
          <div key={i} className='text-richblack-800 cursor-pointer' onClick={() => onSubmit(ele?._id)}>
            {ele?.title}
          </div>
        ))}
      </div>

      <div className='bg-richblack-5'>
        <h1 className='text-richblack-900 font-extrabold text-2xl'>Task which is complted</h1>
        {/* Uncompleted tasks */}
        {uncomplete?.map((ele, i) => (
          <div key={i} className='text-richblack-800 cursor-pointer' onClick={() => onSubmit(ele?._id)}>
            {ele?.title}
          </div>
        ))}
      </div>
     </div>
      {/* Render TaskSubmition only when a task is selected */}
      {selectedTaskId && <TaskSubmition taskId={selectedTaskId} />}
    </div>
  );
};

export default TodoTask;
