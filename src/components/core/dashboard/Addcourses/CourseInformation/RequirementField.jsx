import React, { useEffect, useState } from 'react'

const RequirementField = ({label,name,register,placeholder,errors,setValue,getValues}) => {
    const [requirement,setRequrment]=useState("");
    const [requirementList,setRequirementList]=useState([]);

    const handleAddrequirement = ()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequrment("");
        }
    }
    const handleRemoverequirement = (index)=>{
        const updatedRequirementList =[...requirementList];
        updatedRequirementList.splice(index,1)
        setRequirementList(updatedRequirementList)
    }
    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length > 0
        })
    },[])
    useEffect(()=>{
        setValue(name,requirementList)
    },[requirementList])
  return (
   <div className='text-white'>
     <div>
      <label htmlFor={label}>{label}<sup className='text-pink-200'>*</sup></label>
      <input 
      type="text"
      id={name}
      value={requirement}
      onChange={(e)=>setRequrment(e.target.value)}
      placeholder={placeholder}
      className="bg-richblack-700 px-4 py-2 rounded-md text-richblack-5 border-b-2 border-b-richblack-500 w-full"
      />
      
      <button type='button'
      onClick={handleAddrequirement}
      className='font-semibold text-yellow-50'
      >
        Add
      </button>
    </div>
    {
        requirementList.length > 0 &&(
            <ul>
                {
                    requirementList.map((requirement,index)=>(
                        <li key={index}>
                            <span>{requirement}</span>
                            <button type='button' onClick={()=>handleRemoverequirement(index)} className='text-pure-greys-300 text-xs'>
                                clear
                            </button>
                        </li>
                    ))
                }
            </ul>
        )
    }
    {errors[name] && (
            <span className=' text-pink-200'>
                {label} is required
            </span>
        )}
   </div>
  )
}

export default RequirementField
