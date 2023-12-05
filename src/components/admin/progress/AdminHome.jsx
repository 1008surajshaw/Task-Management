import React from 'react'
import AddTask from '../task/AddTask'
import CreateTeam from '../team/CreateTeam'
import AddUserTeam from '../team/AddUserTeam'
import AllTeam from '../team/AllTeam'

const AdminHome = () => {
  return (
    <div className='text-richblack-5 flex flex-col mx-auto justify-center text-center'>
        <h1 className='text-5xl text-richblack-5 mx-auto'>Welcome Admin check here the updates</h1>
        
     
     <AddUserTeam/>
     {/* <AllTeam/> */}
     
      
     
    </div>
  )
}

export default AdminHome