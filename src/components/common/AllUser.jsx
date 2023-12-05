import React, { useEffect, useState } from 'react';
import { allUser } from '../../services/operations/taskAPI';
import { useSelector } from 'react-redux'
const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL =process.env.REACT_APP_BASE_URL
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(BASE_URL+'/team/alluser', {
          method: 'GET'
        });
        if (res) {
            console.log(res,"resssspppppppso")
          setUsers(res);
          setFilteredUsers(res);
        }
      } catch (error) {
        console.log("Could not fetch data", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleUserClick = (selectedUserId) => {
    // Find the selected user based on the user ID
    const selected = users.find((user) => user._id === selectedUserId);
    // Set the selected user's name to the state
    setSelectedUser(selected ? selected.username : null);
  };

  const handleSubmit = () => {
    // Handle your submit logic here
    console.log('Selected User:', selectedUser);
  };

  return (
    <div className='container mx-auto flex flex-col '>
      <h1 className='text-3xl font-bold text-richblack-800'>Search by Source</h1>

      <div>
        <input
          type='text'
          onChange={handleFilterChange}
          placeholder='Search here...'
          className='w-full md:w-64 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500 mr-4 '
        />
        <select
          className='w-full md:w-64 mt-4 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500 mr-4'
          onChange={handleUserClick}
        >
          <option value='' disabled>
            Select a user
          </option>
          {filteredUsers.map((user, idx) => (
            <option key={idx} value={user._id} className='w-[200px]'>
              {user.username} - {user.email}
            </option>
          ))}
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-4'
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default AllUser;
