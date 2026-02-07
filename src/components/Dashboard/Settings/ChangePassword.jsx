import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../../Redux/slices/settingsApi";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.warning("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New Password and Confirm Password do not match");
    }

    try {
      const payload = {
        currentPassword,
        newPassword,
        confirmPassword,
      };
      console.log("payload", payload);

      const res = await changePassword(payload).unwrap();

      if (res.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-[#fff] p-8">
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Current Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#2B7FFF",
                }}
              >
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                fullWidth
                onChange={(e) => setCurrentPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowCurrentPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? (
                        <IoIosEyeOff className="text-[#2B7FFF]" />
                      ) : (
                        <IoMdEye className="text-[#2B7FFF]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* New Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#2B7FFF",
                }}
              >
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <IoIosEyeOff className="text-[#2B7FFF]" />
                      ) : (
                        <IoMdEye className="text-[#2B7FFF]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* Confirm Password */}
            <div>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{
                  color: "#2B7FFF",
                }}
              >
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                fullWidth
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <IoIosEyeOff className="text-[#2B7FFF]" />
                      ) : (
                        <IoMdEye className="text-[#2B7FFF]" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2B7FFF",
                  color: "white",
                  fontSize: "16px",
                  textTransform: "none",
                  padding: "10px",
                  float: "right",
                }}
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
