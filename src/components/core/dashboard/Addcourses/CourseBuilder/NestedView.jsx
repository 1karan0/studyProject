import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"

const NestedView = () => {
    const {course}=useSelector((state)=>state.course)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const [addSubsection,setAddsubSection]=useState(null);
    const [viewSubsection,setViewsubSection]=useState(null);
    const [editSubsection,setEditsubSection]=useState(null);
    const [confirmationModal,setConfirmationModal]=useState(null);
  return (
    <div>
      <div>
        <div>
            {course?.courseContent?.map((section)=>(
                <details key={section.id} open>
                    <summary>
                        <div>
                            <RxDropdownMenu/>
                            <p>{section.sectionName}</p>
                        </div>
                    </summary>
                </details>
            ))}
        </div>
      </div>
    </div>
  )
}

export default NestedView
