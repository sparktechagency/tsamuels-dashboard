import { useState } from "react";

import { MdOutlineDashboard } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { PiTestTubeBold } from "react-icons/pi";
import { FaFirstAid } from "react-icons/fa";
import { IoCar } from "react-icons/io5";
import { BsChatHeart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

import { Link, NavLink } from "react-router-dom";

import logo from "../../../public/Images/logo.png";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="bg-linear-to-r from-[#00D3F2] to-[#2B7FFF] h-screen w-full">
      <div className="flex flex-col items-center gap-4 py-5">
        <Link to="/" className="">
          <img src={logo} alt="" className="h-12 mx-auto" />
        </Link>
        <hr className="w-24 border border-[#E0E1E2]" />
      </div>
      <div className="flex flex-col px-4 py-3 gap-1">
        {[
          {
            to: "/overview",
            icon: <MdOutlineDashboard fontSize={24} />,
            label: "Overview",
          },
          {
            to: "/user-details",
            icon: <PiUsers fontSize={24} />,
            label: "User Details",
          },
          {
            to: "/diagnosis",
            icon: <PiTestTubeBold fontSize={24} />,
            label: "Diagnosis",
          },

          {
            to: "/therapy",
            icon: <FaFirstAid fontSize={24} />,
            label: "Therapy",
          },
          {
            to: "/parenting-journey",
            icon: <IoCar fontSize={24} />,
            label: "Parenting Journey",
          },
          {
            to: "/interests-and-values",
            icon: <BsChatHeart fontSize={24} />,
            label: "Interests & Values",
          },
          {
            to: "/settings",
            icon: <IoSettingsOutline fontSize={24} />,
            label: "Settings",
          },

          // {
          //   to: "/edit-profile",
          //   icon: <FaRegUserCircle fontSize={24} />,
          //   label: "Edit Profile",
          // },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => handleSelect(to)}
            className={({ isActive }) =>
              `flex items-center font-medium gap-3 text-base py-2 px-2 rounded-md 
              ${
                isActive
                  ? "bg-[#2B7FFF] text-[#fff]"
                  : selected === to
                  ? "bg-[#2B7FFF] text-black"
                  : "text-black"
              }
              hover:bg-[#2B7FFF] hover:text-[#fff]`
            }
          >
            {icon}
            <p>{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
