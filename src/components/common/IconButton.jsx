import React from "react";

const IconButton = ({
  text,
  onClick,
  children,
  disable,
  outline = false,
  customClasses,
  type,
}) => {
  return <button disabled={disable}
  onClick={onClick}
  type={type}
  >
    {children ? (<><span >{text}</span></>):(
      <span className="bg-yellow-50 text-richblack-800 px-6 py-2 rounded-[4px]">{text}</span>
    )}
  </button>;
};

export default IconButton;
