import React,{useState} from 'react'
import { sidebarLinks } from '../../data/home-links'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from '../common/ConfirmationModal'
import { logout } from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux'

const Sidebar = () => {
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
      <>
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
             
              return (
                <SidebarLink key={link.id} link={link}  />
              )
            })}
  
          </div>
        
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
          <div className="flex flex-col">
           
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
          </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    )
  }
  
  export default Sidebar