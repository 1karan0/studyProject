import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
    const {token}= useSelector((state)=> state.auth);

    const [EnrolledCourses, setEnrolledCourses] = useState(null); 
    
    const getEnrolledCoursed = async()=>{
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }

        catch(err){
            console.log("ERROR MESSAGE - ", err.message);
        }
    }
    useEffect(()=>{
        getEnrolledCoursed();
    },[]);
  return (
    <div>
      <div className='text-white'>Enrolled Courses</div>
      {
        !EnrolledCourses ?(
            <div className='spinner'></div>
        ): !EnrolledCourses.length ? (
            <div className='text-white'>You have not enrolled in any courses yet.</div>
        ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div>
                    <p>Course Name</p>
                    <p>Duration</p>
                    <p>Progress</p>
                </div>
                <div>
                    {EnrolledCourses.map((course, index) => (
                        <div key={index} className='bg-gray-800 p-4 rounded-lg mb-4'>
                            <div>
                                <img src={course.thumbnail} alt="" />
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>
                            <div>
                                {course?.totalDuration }
                            </div>
                            <div>
                                <p>progress: {course?.progressPercentage || 0}</p>
                                <ProgressBar completed={course.progressPercentage || 0}
                                height='8px'
                                isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {EnrolledCourses && EnrolledCourses.length > 0 && (
            <div className='text-white'>You are enrolled in {EnrolledCourses.length} courses.</div>
        )}
    </div>
  )
}

export default EnrolledCourses
