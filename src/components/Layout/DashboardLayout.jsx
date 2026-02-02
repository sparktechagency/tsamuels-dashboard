import React from "react";
import Sidebar from "../Shared/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {!isMobile ? (
        <div className="w-[250px] shrink-0">
          <Sidebar />
        </div>
      ) : null}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
          },
        }}
      >
        <Sidebar closeSidebar={handleDrawerToggle} />
      </Drawer>

      <div className="flex-1 flex flex-col h-screen overflow-auto">
        <Header handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
        <div className="p-4 md:p-6 lg:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
