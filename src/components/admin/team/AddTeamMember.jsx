import React from 'react';

import { useSelector } from 'react-redux';
import { addMember } from '../../../services/operations/taskAPI';
import AssignTaskss from '../task/AssignTaskss';
import IconBtn from '../../common/IconBtn';
const AddTeamMember = (props) => {
  const { teamId, userId } = props;
  const { token } = useSelector((state) => state.auth);

  const addMembers = async () => {
    // Push teamId and userId to a variable called data
    const data = {
      teamId: teamId,
      memberId: userId,
    };

    try {
      // Call the backend function with the data
      const res = await addMember(data,token)
      if(res){

          console.log('Member added successfully!');
      }
      console.log("not added ")
    } catch (error) {
      console.error('Failed to add member:', error.message);
    }
  };

  

  return (
    <div className='bg-richblack-200 m-6 p-4'>
      <h1 className='text-2xl font-bold'>AddTeamMember</h1>
      <p className='text-xl '>Team ID: {teamId}</p>
      <p className='text-xl '>User ID: {userId}</p>
      {/* Display other props as needed */}
      <div className='flex justify-center mx-auto m-8'>
      <IconBtn text="Create_Assign_Task pt-3">

        <button onClick={addMembers}>Add Member</button>
      </IconBtn>
      </div>
      
    </div>
  );
};

export default AddTeamMember;
