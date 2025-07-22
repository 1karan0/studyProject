import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
const RenderTotalAmount = () => {
    const {total,cart}= useSelector((state)=>state.cart)
    const handleBuyCourse=()=>{
        const courses = cart.map((course)=>course._id)
        console.log("added in cart",courses)
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>
      <IconButton text="Buy Now" onClick={handleBuyCourse} color="yellow-50" customClasses={"w-full justify-center"} />
    </div>
  )
}

export default RenderTotalAmount
