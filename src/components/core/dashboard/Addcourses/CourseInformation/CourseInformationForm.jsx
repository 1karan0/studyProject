import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setStep, setCourse } from "../../../../../slices/courseSlice";
import IconButton from "../../../../common/IconButton";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { toast } from "react-hot-toast";
import Upload from "./Upload";
import ChipInput from "./ChipInput";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  //handles next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if(currentValues.courseTags!==course.tag){
          formData.append("tag",data.courseTags);
        }
        if(currentValues.courseImage !== course.thumbnail){
          formData.append("thumbnail",data.courseImage);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO Changes made so far");
      }

      return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnail", data.courseImage);
    formData.append("tag",data.courseTags)

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      console.log("step data = ",setStep())
      dispatch(setCourse(result));
    }
    setLoading(false);

    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 text-white bg-richblack-800 p-6 space-y-8"
    >
      <div>
        <label htmlFor="courseTitle">
          Course Title<sup className='text-pink-200'>*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="bg-richblack-700 px-4 py-2 rounded-md text-richblack-5 border-b-2 border-b-richblack-500 w-full"
        />
        {errors.courseTitle && <span className='text-pink-200'>Course Title is Required**</span>}
      </div>

      <div>
        <label htmlFor="courseShortDesc">
          Course Short Description<sup className='text-pink-200'>*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="bg-richblack-700 px-4 py-2 rounded-md text-richblack-5 border-b-2 border-b-richblack-500 w-full min-h-[140px]"
        />
        {errors.courseShortDesc && (
          <span className='text-pink-200'>Course Description is required**</span>
        )}
      </div>

      <div className="relative">
        <label htmlFor="coursePrice">
          Course Price<sup className='text-pink-200'>*</sup>
        </label>
        <input
        type="number"
        onWheel={(e) => e.target.blur()}
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })}
          className="bg-richblack-700 px-9 py-2 rounded-md  border-b-2 border-b-richblack-500 w-full"
        />
        <HiOutlineCurrencyRupee className="absolute top-9 left-2 text-richblack-400" />
        {errors.coursePrice && <span className='text-pink-200'>Course Price is Required**</span>}
      </div>

      <div>
        <label htmlFor="courseCategory">
          Course Category<sup className='text-pink-200'>*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="bg-richblack-700 px-4 py-2 rounded-md text-richblack-5 border-b-2 border-b-richblack-500 w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>

          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span className='text-pink-200'>Course Category is Required</span>}
      </div>

      {/* create a custom component for handling tags input */}
      <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
        />

      {/* create a component for uploading and showing preview of media */}
      <Upload
              name="courseImage"
              label="Course Thumbnail"
              register={register}
              setValue={setValue}
              errors={errors}
              editData={editCourse ? course?.thumbnail : null}
            />

      {/*     Benefits of the Course */}
      <div>
        <label>
          Benefits of the course<sup className='text-pink-200'>*</sup>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="bg-richblack-700 px-4 py-2 rounded-md min-h-[140px] text-richblack-5 border-b-2 border-b-richblack-500 w-full"
        />
        {errors.courseBenefits && (
          <span className='text-pink-200'>Benefits of the course are required**</span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-richblack-300"
          >
            Continue Without Saving
          </button>
        )}

        <IconButton
        type="submit"
        onClick={() => dispatch(setStep(2))}
          text={!editCourse ? "Next" : "Save Changes"}
          color="yellow-50"
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
