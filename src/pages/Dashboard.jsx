import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/Sidebar';

const Dashboard = () => {
    const {loading:authLoading} = useSelector( (state)=> state.auth);
    const {loading:profileLoading} = useSelector( (state)=> state.profile);

    if(authLoading || profileLoading){
        return(
            <div>
                <div className="spinner"></div>
            </div>
        )
    }
  return (
    <div className='relative flex w-full h-screen '>
      <Sidebar/>
      <div className=' overflow-y-scroll w-full'>
        <div className='  py-10'>
            <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
