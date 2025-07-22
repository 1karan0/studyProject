import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {GiNinjaStar} from 'react-icons/gi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {
    const {cart}= useSelector((state)=>state.cart)
    const dispatch = useDispatch()

  return (
    <div>
    {
        cart.map((courses,index)=>(
            <div key={index}>
                <div>
                    <img src={courses?.thumbnail} alt="" />
                    <div>
                        <p>{courses?.courseName}</p>
                        <p>{courses?.category?.name}</p>
                        <div>
                            <span>4.6</span>
                            <ReactStars 
                            count={5}
                            size={20}
                            edit={false}
                            activeColor='#ffd700'
                            emptyIcon={<GiNinjaStar/>}
                            fullIcon={<GiNinjaStar/>}
                            />
                            <span>{courses?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={()=>dispatch(removeFromCart(courses?._id))}>
                        <RiDeleteBin6Line/> <span>Remove</span>
                    </button>
                    <p>{courses?.price}</p>
                </div>
            </div>
        ))
    }  
    </div>
  )
}

export default RenderCartCourses
