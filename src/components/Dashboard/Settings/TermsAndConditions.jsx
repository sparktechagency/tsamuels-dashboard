import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import { Button, CircularProgress } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
} from "../../../Redux/slices/settingsApi";
import { toast } from "sonner";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery("termsOfService");
  // console.log(getSettingsData?.data);

  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  // const [updateSettings, { isLoading: isUpdating }] =
  //   useUpdateSettingsMutation();

  useEffect(() => {
    if (getSettingsData?.data) {
      setContent(getSettingsData?.data);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      const response = await addSettings({ termsOfService: content }).unwrap();
      // console.log(response);
      if (response.success) {
        toast.success("Terms and Conditions added successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to save Terms and Conditions. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms and Conditions. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#fbfbfb] rounded-lg py-1 px-4">
      <div className="p-2 rounded">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-bold  text-[#222021]">
            Terms and Condition
          </h1>
          <Button
            onClick={handleOnSave}
            sx={{
              width: "150px",
              bgcolor: "#2B7FFF",
              color: "white",
              textTransform: "none",
              height: "40px",
              fontSize: "16px",
              ":hover": {
                bgcolor: "#242424",
                borderColor: "#0080FF",
              },
            }}
          >
            Save & Change
          </Button>
        </div>
        <div className="my-5">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
};
export default TermsAndConditions;
