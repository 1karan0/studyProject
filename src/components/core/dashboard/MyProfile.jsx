import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';

const MyProfile = () => {


    const {user}=useSelector((state)=>state.profile);
    const {loading}=useSelector((state)=>state.profile);
    
    const navigate =useNavigate();
  return (
    <div className='text-white w-full px-40'>
      <h1 className='text-4xl'>My Profile</h1>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className='flex flex-col gap-y-8 w-full p-10'>
          <div className='w-full'>
         
          {/* section-1 */}
          <div className='flex items-center  justify-between mt-10 bg-richblack-800 rounded-[5px] px-8 py-5 w-full'>
            <div className='flex items-center gap-x-4 py-4'>
                <img 
                src={user?.image} 
                alt={user?.firstName} 
                className=' aspect-square w-[58px] rounded-full object-cover'
                />
                <div>
                    <p>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-xs text-richblack-400'> {user?.email}</p>
                </div>
            </div>
            <IconButton  text="Edit" onClick={() => navigate("/dashboard/settings")} />
          </div>
        </div>
        {/* section-2 */}
        <div className='flex flex-col gap-y-8 bg-richblack-800 p-8  rounded-[5px] '>
          <div className='flex items-center justify-between'>
            <p>About</p>
            <IconButton
            text="Edit"
            onClick={()=> navigate("/dashboard/settings")}
            />
          </div>
          <p className='text-xs text-richblack-400'>{user?.additionalDetails?.about ?? "write something about yourself"}</p>
        </div>
        {/* section-3 */}
        <div className='flex flex-col gap-y-8 bg-richblack-800 p-8 rounded-[5px]'>
          <div className='flex items-center justify-between mb-4'>
            <p>Personal details</p>
            <IconButton
            text="Edit"
            onClick={()=> navigate("/dashboard/settings")}
            />
          </div>
          <div className='grid grid-cols-2'>
            <div className='mb-4'>
            <p className='text-richblack-600'>First name :</p>
            <p>{user?.firstName}</p>
          </div>
          <div className='mb-4'>
            <p className='text-richblack-600'>Last name :</p>
            <p>{user?.lastName}</p>
          </div>
          <div className='mb-4'>
            <p className='text-richblack-600'>Email :</p>
            <p>{user?.email}</p>
          </div>
          <div className='mb-4'>
            <p className='text-richblack-600'>Gender :</p>
            <p>{user?.additionalDetails?.gender ?? "Not specified"}</p>
          </div>
          <div className='mb-4'>
            <p className='text-richblack-600'>Phone Number :</p>
            <p>{user?.additionalDetails?.contactNumber ?? "Not specified"}</p>
          </div>
          <div className='mb-4'>
            <p className='text-richblack-600'>Date of Birth :</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Not specified"}</p>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default MyProfile
