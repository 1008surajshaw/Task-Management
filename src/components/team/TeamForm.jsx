import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTeam } from '../../services/operations/taskAPI';
function TeamForm() {
  const { token } = useSelector((state) => state.auth);

  const [teamName, setTeamName] = useState('');

  const handleTeamNameChange = (event) => {
   // setTeamName(event.target.value);
    setTeamName("abcd")
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    console.log(teamName, "teamnameeeeeee");

    try {
      const response = await createTeam(teamName, token);
      console.log(response);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
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
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
}

export default TeamForm;
