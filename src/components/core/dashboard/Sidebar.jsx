import React, { useState } from "react";
import { logout } from "../../../services/operations/authAPI";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div>
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="text-white">
      <div className="w-[250px] flex flex-col border-r-[1px] border-r-richblack-700 h-screen bg-richblack-800 py-10">
        {sidebarLinks.map((link, index) => {
          if (link.type && user?.accountType !== link.type) return null;
          return (
            <SidebarLinks link={link} iconName={link.icon} key={link.id} />
          );
        })}
      
      <div className=" mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>
      <div className=" flex flex-col">
        <SidebarLinks
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure ?",
              text2: "You will be logout of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => {
                setConfirmationModal(null);
              },
            })
          }
          className="text-richblack-5 flex items-center gap-x-2 px-8 py-2 text-sm font-medium"
        >
          <div className=" flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
