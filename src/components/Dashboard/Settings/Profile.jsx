import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";

import profileImg from "../../../../public/Images/profile.png";
import {
  useEditProfileMutation,
  useGetProfileDataQuery,
} from "../../../Redux/slices/settingsApi";
import { getImageUrl } from "../../../utils/baseUrl";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(profileImg);
  const [uploadedFile, setUploadedFile] = useState(null);

  const imageUrl = getImageUrl();

  const {
    data: profileData,
    isLoading: loadingProfile,
    refetch,
  } = useGetProfileDataQuery();

  const profile = profileData?.data;

  const [editProfile] = useEditProfileMutation();

  /* --------------------------------------------
     Populate form fields when API data loads
  --------------------------------------------- */
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setUserName(profile.nickName?.[0] || profile.name || "");
      setPhone(profile.phone || "");
      setProfileImage(profile.image ? profile.image : profileImg);
    }
  }, [profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the file for upload
    setUploadedFile(file);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const data = {
        ...(name && { name }),
        ...(userName && { nickName: userName }),
        ...(phone && { phone }),
      };

      console.log("Data to send:", data);

      // Stringify the data object for FormData
      formData.append("data", JSON.stringify(data));

      // Append image if a new one was uploaded
      if (uploadedFile) {
        formData.append("image", uploadedFile);
      }

      if (!uploadedFile && profile?.image) {
        formData.append("image", profile.image);
      }

      console.log("Update Payload:", {
        data,
        uploadedFile,
      });

      const response = await editProfile(formData).unwrap();
      console.log("Profile update response:", response);
      if (response.success) {
        refetch();
        toast.success("Profile updated successfully!");
        setUploadedFile(null); // Clear the uploaded file after success
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full bg-white p-8">
      <div className="flex gap-10">
        {/* Profile Image */}
        <div className="relative">
          <div className="bg-[#efefef]">
            <img
              src={
                uploadedFile
                  ? profileImage // preview new upload
                  : profile?.image
                    ? `${imageUrl}/${profile.image}`
                    : profileImg
              }
              alt="profile"
              className="size-40 object-cover"
            />
          </div>

          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              backgroundColor: "#2B7FFF",
              borderRadius: "50%",
              padding: "8px",
              ":hover": { backgroundColor: "#1f6ae1" },
            }}
            component="label"
          >
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <FiEdit fontSize={20} className="text-white" />
          </IconButton>
        </div>

        {/* Profile Form */}
        <div className="flex flex-col gap-8 w-2/3">
          <div className="flex items-center gap-5">
            <TextField
              label="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="User Name"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-5">
            <TextField label="Email" fullWidth value={email} disabled />

            <TextField
              label="Phone"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <Box mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2B7FFF",
                textTransform: "none",
                padding: "10px",
                width: "40%",
                float: "right",
              }}
              onClick={handleSubmit}
            >
              Save & Update
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
