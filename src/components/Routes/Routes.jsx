import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import SignIn from "../../pages/SignIn";
import ForgotPassword from "../../pages/ForgotPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Notifications from "../Dashboard/Notifications";
import VerifyOtp from "../../pages/VeryfiOTP";
import UpdatePassword from "../../pages/UpdatePassword";
import RevenueManagement from "../Dashboard/RevenueManagement";
import Support from "../Dashboard/Support";
import { GrowthRetention } from "../Dashboard/GrowthAndRetention";
import AdminControls from "../Dashboard/AdminControls";
import Settings from "../Dashboard/Settings";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { HolidaysManagement } from "../Dashboard/HolidaysManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "overview",
            element: <Dashboard />,
          },
          {
            path: "growth-retention",
            element: <GrowthRetention />,
          },
          {
            path: "revenue-management",
            element: <RevenueManagement />,
          },
          {
            path: "support",
            element: <Support />,
          },
          {
            path: "admin-controls",
            element: <AdminControls />,
          },
          {
            path: "holidays",
            element: <HolidaysManagement />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
