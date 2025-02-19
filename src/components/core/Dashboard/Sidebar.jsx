import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/Dashboard-Link"
import {logout } from "../../../services/Operation/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';

function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ConfirmationModalData, setConfirmationModalData] = useState(null);
    
    if (profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className='text-white bg-richblack-800'>
            <div  className='flex flex-col w-fit md:min-w-[220px] min-h-[calc(100vh-3.5rem)] border-r border-richblack-700 py-10' >
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

                <div className='flex flex-col'>
                    <SidebarLink
                    link={{name:"Settings", path:"dashboard/settings"}}
                    iconName="VscSettingsGear"
                    />
                    <button
                        onClick={() => setConfirmationModalData({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModalData(null),
                        })}
                        className='flex gap-x-2 items-center text-sm font-medium px-3 md:px-8 py-2 text-richblack-300'
                    >
                        <VscSignOut className='text-lg'/>
                        <span className='hidden md:block tracking-wider uppercase'>Logout</span>
                    </button>
                </div>
            </div>

            {ConfirmationModalData && <ConfirmationModal modalData={ConfirmationModalData} />}
        </div>
    )
}

export default Sidebar