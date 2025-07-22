import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,
  codeColor,
}) => {
    console.log(backgroudGradient)
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/*Section 1*/}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold ">{subheading}</div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/*Section 2*/}
      <div className="relative">
        {/* Blurred Bubble */}
        <div className={`absolute top-10 left-32 -translate-x-2/3  w-60 h-40 rounded-full bg-gradient-to-r ${backgroudGradient} opacity-30 hover:scale-150 blur-3xl z-10  transition-all duration-500`}></div>

        {/* Code Block Content */}
        <div className=" h-fit z-50 bg-opacity-30 border-richblack-500 border-[1px]  bg-[#09152b] bg flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] ">
          {/*HW -> BG gradient*/}

          <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
