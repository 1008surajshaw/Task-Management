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

        const uncompletedTasks = data.filter((task) => task.completed === false);

        setUnComplete(uncompletedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [token]);

  const onSubmit = (taskId) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div className='flex flex-col text-richblack-25'>
      <h1 className=''>To submit your response, click on the task you want to submit</h1>
      <div className='flex flex-row justify-between'>
        <div className='bg-richblack-5'>
          {/* Completed tasks */}
          <h1 className='text-richblack-900 font-extrabold text-2xl'>Tasks which are not completed</h1>
          {uncomplete.length === 0 ? (
            <p className='text-richblack-5 font-extrabold text-2xl'>You don't have any pending work.</p>
          ) : (
            uncomplete.map((ele, i) => (
              <div key={i} className='pt-4 m-3 text-richblack-800 cursor-pointer border p-3 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-300' onClick={() => onSubmit(ele?._id)}>
               <p>Title: {ele?.title}</p> 
               <p>Description: {ele?.description}</p>
              <p>Due Date: {new Date(ele?.dueDate).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Render TaskSubmition only when a task is selected */}
      {selectedTaskId && <TaskSubmition taskId={selectedTaskId} />}
    </div>
  );
};

export default TodoTask;
