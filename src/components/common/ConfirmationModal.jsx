import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className=' absolute top-[50%] border left-[60%] translate-x-[-50%] translate-y-[-50%] bg-richblack-800 justify-center p-8 rounded-lg text-white w-[90%] max-w-[500px]'>
      <div className='flex flex-col items-center justify-center text-center'>
        <p className='text-4xl font-bold'>{modalData.text1}</p>
        <p className='font-semibold'>{modalData.text2}</p>
        <div className='flex items-center justify-center gap-x-4 mt-6'>
            <IconButton onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            color="yellow-50"
            />
            
            <IconButton onClick={modalData?.btn2Handler}
            text={modalData?.btn2Text}
            color="richblack-5"
            />
        </div>
      </div>
    </div>
    </div>
  )
}

export default ConfirmationModal;
