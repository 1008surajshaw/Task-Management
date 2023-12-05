import React, { useState, useEffect } from 'react';
import { createTeam } from '../../../services/operations/taskAPI';
import { useSelector } from 'react-redux';
import Task from './Task';


const AddTask = ({userId}) => {

  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showTasks, setShowTasks] = useState(false); // State to track whether to show tasks

  useEffect(() => {
    const fetchData = async ({userId}) => {
      setLoading(true);
      try {
        const res = await createTeam();
        if (res) {
          setData(res);
        }
      } catch (error) {
        console.log("Could not fetch data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleToggleTasks = () => {
    setShowTasks((prevShowTasks) => !prevShowTasks); // Toggle the state
  };

  return (
    <div className='bg-richblack-400'>
      <h1>AddTask</h1>

       <Task />
      
    </div>
  );
};

export default AddTask;
