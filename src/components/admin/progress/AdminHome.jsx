import React from 'react';
import AddUserTeam from '../team/AddUserTeam';
import { logedout, logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call the backend API for logout
      await logedout();

      // Dispatch any necessary actions for Redux (if needed)
      // dispatch(logoutAction());

      // Redirect to the login page or any other desired route
      navigate('/open');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='text-richblack-5 flex flex-col mx-auto justify-center text-center'>
      <h1 className='text-5xl text-richblack-5 mx-auto'>Welcome Admin, check here for updates</h1>

      <AddUserTeam />

      {/* Your other components go here */}
      
      {/* Logout button */}
      <button className='bg-red-500 text-white p-2 mt-4 rounded' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
