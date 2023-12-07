import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allTeam } from '../../../services/operations/taskAPI';
import CreateTeam from './CreateTeam';

import AddTeamMember from './AddTeamMember';
import AssignTaskss from '../task/AssignTaskss';

const AllTeam = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await allTeam();
      setTeams(res.data.team);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    // Call fetchData on component mount
    fetchData();
  }, []);

  const handleShowMoreToggle = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const handleCardClick = (teamId) => {
    if (selectedTeamId === teamId) {
      // If the clicked team is already selected, set selectedTeamId to null
      setSelectedTeamId(null);
    } else {
      setSelectedTeamId(teamId);
    }
  };
  
  return (
    <div className="container mx-auto">
    <h1 className="text-3xl font-bold text-richblack-800">Team</h1>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {teams.map((team) => (
          <div
            key={team._id}
            className={`border p-4 cursor-pointer ${
              selectedTeamId === team._id ? 'border-yellow-500 bg-yellow-200' : 'border-gray-300'
            }`}
            onClick={() => {
              handleCardClick(team._id);
            }}
           
          >
            <h2 className="text-lg font-semibold">{team.name}</h2>
            <p>Created By: {team.createdBy}</p>
            <p>Members: {team.members.join(', ')}</p>
            {showMore && (
              <div>
                <p>Tasks: {team.tasks.join(', ')}</p>
                {/* Add more details as needed */}
              </div>
            )}
            <button
              className="text-blue-500 underline"
              onClick={handleShowMoreToggle}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ))}
      </div>
    )}
    <CreateTeam onCreateTeam={fetchData}/>
    <AddTeamMember teamId={selectedTeamId} userId={userId} />
    <AssignTaskss teamId={selectedTeamId} userId={userId}/>
  </div>
  );
};

export default AllTeam;
