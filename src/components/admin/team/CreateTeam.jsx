import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTeam } from '../../../services/operations/taskAPI';
import IconBtn from '../../../components/common/IconBtn';
import { VscAdd } from 'react-icons/vsc';
import AllTeam from './AllTeam';
import AddUserTeam from './AddUserTeam';

const CreateTeam = ({ onCreateTeam }) => {
  const { token } = useSelector((state) => state.auth);
  const [teamName, setTeamName] = useState('');
  const [showTeams, setShowTeams] = useState(false);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    console.log(teamName, "teamnameeeeeee");

    try {
      const response = await createTeam(teamName, token);
      onCreateTeam();
      
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleToggleTeams = () => {
    setShowTeams((prevShowTeams) => !prevShowTeams);
  };

  return (
    <div className="flex flex-col gap-3 bg-richblack-700 m-5 p-4">
      <div className="text-richblack-900 ">
        <form onSubmit={handleCreateTeam} >
          <label htmlFor="teamName" className='text-2xl '>Team Name:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={teamName}
            onChange={handleTeamNameChange}
            required
          />
          <div className='flex justify-center mx-auto m-8'>
          <IconBtn text="Create Team" >
            <VscAdd className="text-richblack-5" />
          </IconBtn>
          </div>
        </form>
      </div>
      
      
      
    </div>
  );
};

export default CreateTeam;
