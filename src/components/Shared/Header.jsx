import React, { useState } from "react";
import { PiBellSimpleRingingBold } from "react-icons/pi";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import profileImg from "../../../public/Images/profile.png";
import { IconButton } from "@mui/material";

export default function Header({ handleDrawerToggle, isMobile }) {
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setDropdownMenu(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/sign-in");
    handleClose();
  };

  return (
    <div className="flex items-center justify-between w-full px-4 lg:px-10 py-4 bg-linear-to-r to-[#EFF6FF] from-[#ECFEFF] shadow-lg sticky top-0 z-50">
      {isMobile && (
        <div className="lg:hidden">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <IoMdMenu fontSize={28} />
          </IconButton>
        </div>
      )}
      <div className="flex items-center justify-end w-full gap-4">
        {/* <div className="text-white">
          <Link to="/notifications">
            <PiBellSimpleRingingBold fontSize={24} />
          </Link>
        </div> */}
        <Button
          sx={{
            bgcolor: "#2B7FFF",
            textTransform: "none",
            padding: "5px",

            float: "right",
          }}
          onClick={handleProfileClick}
          variant="text"
        >
          <div className="flex items-center gap-2">
            <img
              src={profileImg}
              alt=""
              className="size-8 rounded-full border border-white"
            />
            <p className="text-white font-medium">User Name</p>
            <IoIosArrowDown fontSize={20} color="white" />
          </div>
        </Button>
        <Menu
          anchorEl={dropdownMenu}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: "130px",
            },
          }}
        >
          {/* <MenuItem component={Link} to="/edit-profile" onClick={handleClose}>
            Profile
          </MenuItem>
          <hr className="border-t border-[#ebebeb]" /> */}

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
