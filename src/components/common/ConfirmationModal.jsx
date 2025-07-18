import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-richblack-600 justify-center p-8 rounded-lg text-white w-[90%] max-w-[500px]'>
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className='flex items-center justify-center gap-x-4 mt-6'>
            <IconButton onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            />
            
            <IconButton onClick={modalData?.btn2Handler}
            text={modalData?.btn2Text}
            />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal;
