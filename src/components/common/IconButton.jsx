import React from "react";

const IconButton = ({
  text,
  onClick,
  children,
  disable,
  outline = false,
  customClasses,
  color,
  type,
}) => {
  return <button disabled={disable}
  onClick={onClick}
  type={type}
  className={`bg-${color} text-richblack-800 font-semibold px-6 py-2 rounded-[4px]`}
  >
    {children ? (<><span >{text}</span></>):(
      <span className="">{text}</span>
    )}
  </button>;
};

export default IconButton;
