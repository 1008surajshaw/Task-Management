import React, { useState } from 'react';
//import { createTeam } from '../../../services/operations/taskAPI';
import { useSelector } from 'react-redux';
import IconBtn from '../../../components/common/IconBtn';
import { VscAdd } from 'react-icons/vsc';
import { createaAssign } from '../../../services/operations/taskAPI';

const AssignTaskss = (props) => {
  const { teamId, userId } = props;
  console.log(teamId,userId)

  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('User');

  const handleCreateTask = async (event) => {
    event.preventDefault();

    // Create an object with the form data
    const data = {
      title,
      dueDate,
      description,
    };

    // Conditionally set assignedTo and team based on the selected option
    if (selectedOption === 'User') {
      data.assignedToUser = userId;
      data.assignedToTeam = '';
    } else if (selectedOption === 'Team') {
      data.assignedToTeam = teamId;
      data.assignedToUser = '';
    }
    else{
      data.assignedToUser = userId;
      data.assignedToTeam = '';
    }

    
    try {
    console.log(data,"data kya ha bha")  
    const resp = await createaAssign(data,token);
    
      if(!resp){
        console.log("not done")
      }
    
      
      console.log('Task Data:', data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-richblack-700 m-6 p-4">
      <div className="text-richblack-900">
        <form onSubmit={handleCreateTask}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Add input fields for dueDate and description */}
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        
          <label htmlFor="description">Description:</label>
          <textarea
          className='translate-y-6'
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Add dropdown for user/team selection */}
          <label htmlFor="taskType">Task Type:</label>
          <select
            id="taskType"
            name="taskType"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Team">Team</option>
          </select>
          <div className='flex justify-center mx-auto m-3 p-2'>
          <IconBtn text="Create Task">
            <VscAdd className="text-richblack-5" />
          </IconBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskss;
