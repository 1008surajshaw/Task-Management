import React, { useState, useEffect } from 'react';
import { allUser } from '../../../services/operations/taskAPI';
import AddTask from '../task/AddTask';
import CreateTeam from './CreateTeam';
import AllTeam from './AllTeam';
import AssignTaskss from '../task/AssignTaskss';

const AddUserTeam = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await allUser();
        setUsers(res.data.user);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCardClick = (userId) => {
    if (selectedUserId === userId) {
      // If the clicked user is already selected, set selectedUserId to null
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
    }
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-3xl font-bold text-richblack-800">Search for User</h1>

      <div className="flex flex-wrap gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user._id}
            className={`border p-4 cursor-pointer ${
              selectedUserId === user._id ? 'border-blue-500 bg-yellow-200' : 'border-gray-300'
            }`}
            onClick={() => handleCardClick(user._id)}
          >
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p>{user.email}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>

      {/* <AddTask userId={selectedUserId} /> */}
      <AllTeam userId={selectedUserId}/>
      {/* <AssignTaskss/> */}
      
    </div>
  );
};

export default AddUserTeam;
