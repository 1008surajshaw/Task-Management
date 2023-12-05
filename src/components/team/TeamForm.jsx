import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTeam } from '../../services/operations/taskAPI';
import IconBtn from '../common/IconBtn';
import { VscAdd } from 'react-icons/vsc'
function TeamForm() {
  const { token } = useSelector((state) => state.auth);

  const [teamName, setTeamName] = useState('');

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
    
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    console.log(teamName, "teamnameeeeeee");

    try {
      const response = await createTeam(teamName, token);
      console.log(response,"responses");
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
    <div className='text-richblack-5'>
      <form onSubmit={handleCreateTeam}>
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={teamName}
          onChange={handleTeamNameChange}
          required
        />
        <IconBtn text="Create Team">
           <VscAdd className="text-richblack-5" />
        </IconBtn>
      </form>
    </div>
    </div>
  );
}

export default TeamForm;
