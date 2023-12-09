import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchtask } from '../../services/operations/taskAPI';

const Mytask = () => {
  const { token } = useSelector((state) => state.auth);
  const [uncomplete, setUnComplete] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchtask(token);
        const data = res.data.task;

        const completedTasks = data.filter((task) => task.completed === true);

        setUnComplete(completedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col '>
      <h1 className='text-richblack-900'>These are the tasks you have submitted in the past</h1>
      <div className='flex flex-row justify-between'>
        <div className=''>
          <h1 className='text-richblack-5
          
           font-extrabold text-2xl'>Tasks which are completed</h1>
          {/* Completed tasks */}
          {uncomplete?.map((ele, i) => (
            <div
              key={i}
              className='pt-4 m-3 text-richblack-5 cursor-pointer border p-3 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-300'
            >
              <p>Title: {ele?.title}</p>
              <p>Description: {ele?.description}</p>
              <p>Due Date: {new Date(ele?.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mytask;
