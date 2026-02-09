import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import {
  FaUser,
  FaLock,
  FaFileContract,
  FaInfoCircle,
  FaShieldAlt,
  FaQuestionCircle,
} from "react-icons/fa";

// Import child components
import Profile from "./Settings/Profile";
import ChangePassword from "./Settings/ChangePassword";
import TermsAndConditions from "./Settings/TermsAndConditions";
import AboutUs from "./Settings/AboutUs";
import PrivacyPolicy from "./Settings/PrivacyPolicy";
import FAQ from "./Settings/Faq";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "Personal Information", icon: <FaUser />, component: <Profile /> },
    {
      label: "Change Password",
      icon: <FaLock />,
      component: <ChangePassword />,
    },
    {
      label: "Terms & Conditions",
      icon: <FaFileContract />,
      component: <TermsAndConditions />,
    },
    { label: "About Us", icon: <FaInfoCircle />, component: <AboutUs /> },
    {
      label: "Privacy Policy",
      icon: <FaShieldAlt />,
      component: <PrivacyPolicy />,
    },
    { label: "FAQ", icon: <FaQuestionCircle />, component: <FAQ /> },
  ];

  return (
    <div className="p-8 h-[93vh] overflow-auto">
      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Typography variant="h4" className="font-semibold mb-6">
          Settings
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                minHeight: "60px",
                color: "#666",
                "&.Mui-selected": {
                  color: "#2B7FFF",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#2B7FFF",
                height: 3,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                id={`settings-tab-${index}`}
                aria-controls={`settings-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {tab.component}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
