import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";
const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [EditSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const cencelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("pleace add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("please add atleast one lecture in each Section");
      return;
    }
    dispatch(setStep(3));
  };
  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (EditSectionName) {
      result = await updateSection(
        {
          sectioName: data.sectioName,
          sectionId: EditSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectioName: data.sectioName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectioName", "");
    }
    setLoading(false);
  };
  const cancelEdit=()=>{

  }
  const handelChangeEditSectionName=(sectionId,sectioName)=>{
    if(EditSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectioName);
  }
  return (
    <div className="text-white">
      <h1>Course Builder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Selection name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
          />
          {errors.sectioName && (
            <span className="text-pink-200">Section Name is required</span>
          )}
        </div>
        <div className="mt-10 flex">
          <IconButton
            type="submit"
            text={EditSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white "}
          >
            <MdAddCircleOutline className="text-yellow-50" />
          </IconButton>
          {EditSectionName && (
            <button
              type="button"
              onClick={cencelEdit}
              className="text-sm text-richblack-300 underline ml-10"
            >
              cencel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && <NestedView  handelChangeEditSectionName={handelChangeEditSectionName}/>}
      <div className="flex justify-end gap-x-3">
        <button onClick={goBack} className="rounded-md flex items-center">
          Back
        </button>
        <IconButton text="Next" onClick={goToNext}>
          <BiRightArrow />
        </IconButton>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
