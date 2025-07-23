import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue]);

  return (
    <div className="overflow-y-hidden">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] max-h-[260px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6 max-h-[300px] overflow-auto">
            {!video ? (
                <img
                src={previewSource}
                alt="Preview"
                className="rounded-md object-cover max-h-[180px] w-auto"
                />
            ) : (
                <Player
                aspectRatio="16:9"
                playsInline
                src={previewSource}
                style={{ maxHeight: "180px", objectFit: "cover" }}
                />
            )}
            {!viewData && (
                <button
                type="button"
                onClick={() => {
                    setPreviewSource("");
                    setSelectedFile(null);
                    setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
                >
                Cancel
              </button>
            )}
          </div>
        ) : (
            <div className="">
            <div
              className="flex w-full flex-col items-center p-6"
              {...getRootProps()}
            >
              <div className="grid aspect-square h-14 w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-50" />
              </div>
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                <span
                  className="font-semibold overflow-hidden text-yellow-50 cursor-pointer underline"
                  onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current && inputRef.current.click();
                    }}
                >
                    <input {...getInputProps()} ref={inputRef} className="" />
                  Browse
                </span>{" "}
                a file
              </p>
              {!previewSource && (
                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended size 1024x576</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
