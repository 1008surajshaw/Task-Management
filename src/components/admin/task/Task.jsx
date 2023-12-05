import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allTask } from '../../../services/operations/taskAPI';


const Task = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await allTask();
        setTasks(res.data.task); // Assuming response contains data
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-3xl font-bold text-richblack-800">Task</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-4 mt-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border p-4 cursor-pointer border-gray-300"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>Description: {task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Assigned To: {task.assignedTo}</p>
              <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Task;
