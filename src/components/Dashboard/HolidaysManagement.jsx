import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Chip,
  Box,
  Typography,
  Grid,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

import dayjs from "dayjs";
import { toast } from "sonner";
import HolidayCard from "../UI/HolidayCard";
import { NoDataFallback } from "../utils/noDataFallBack";
import {
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
  useEditHolidayMutation,
  useGetAllHolidaysDataQuery,
} from "../../Redux/slices/holidaysApi";

const colorOptions = [
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#10B981" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#F43F5E" },
];

const emojiOptions = [
  "🎉",
  "🎊",
  "🎈",
  "🎁",
  "🎂",
  "🎯",
  "🎪",
  "🎨",
  "🎭",
  "🎬",
  "🎸",
  "🎤",
  "🏆",
  "⭐",
  "🌟",
  "💫",
  "✨",
  "🔥",
  "💝",
  "🌈",
];

export function HolidaysManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState(null);
  const [selectedColorStart, setSelectedColorStart] = useState("#3B82F6");
  const [selectedColorEnd, setSelectedColorEnd] = useState("#8B5CF6");
  const [addedEmojis, setAddedEmojis] = useState([]);
  const [customEmoji, setCustomEmoji] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    date: "",
    emojis: "",
  });
  const [emojiClickAnimation, setEmojiClickAnimation] = useState({});

  const { data: allHolidaysData, isLoading: loadingAllHolidaysData } =
    useGetAllHolidaysDataQuery();
  const holidaysData = allHolidaysData?.data || [];
  console.log(holidaysData);

  const [createHolidays] = useCreateHolidayMutation();
  const [editHolidays] = useEditHolidayMutation();
  const [deleteHolidays] = useDeleteHolidayMutation();

  const handleAddHoliday = async () => {
    const newErrors = { name: "", date: "", emojis: "" };
    let hasError = false;

    // Validate holiday name
    const trimmedName = holidayName.trim();
    if (trimmedName.length < 3) {
      newErrors.name = "Holiday name must be at least 3 characters";
      toast.error("Holiday name must be at least 3 characters");
      hasError = true;
    } else if (trimmedName.length > 50) {
      newErrors.name = "Holiday name must be at most 50 characters";
      toast.error("Holiday name must be at most 50 characters");
      hasError = true;
    } else {
      // Check for duplicates (excluding current editing holiday)
      const isDuplicate = holidaysData.some(
        (event) =>
          event.name.toLowerCase() === trimmedName.toLowerCase() &&
          (!editingHoliday || event._id !== editingHoliday._id),
      );
      if (isDuplicate) {
        newErrors.name = "A holiday with this name already exists";
        toast.error("A holiday with this name already exists");
        hasError = true;
      }
    }

    if (!holidayDate) {
      newErrors.date = "Please select a date";
      toast.error("Please select a date for the holiday");
      hasError = true;
    }

    if (addedEmojis.length < 5) {
      newErrors.emojis = "Please add at least 5 emojis";
      toast.error(
        `Please add at least 5 emojis (currently ${addedEmojis.length})`,
      );
      hasError = true;
    } else if (addedEmojis.length > 15) {
      newErrors.emojis = "Maximum 15 emojis allowed";
      toast.error("Maximum 15 emojis allowed");
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingHoliday) {
        // Update existing holiday
        const holidayData = {
          name: trimmedName,
          startDate: holidayDate.format("YYYY-MM-DD"),
          color: selectedColorStart,
          secondaryColor: selectedColorEnd,
          animatedIcon: addedEmojis,
        };

        const response = await editHolidays({
          data: holidayData,
          id: editingHoliday._id,
        }).unwrap();

        console.log("Edit response:", response);
        toast.success("Holiday updated successfully");
      } else {
        // Create new holiday
        const newHoliday = {
          name: trimmedName,
          startDate: holidayDate.format("YYYY-MM-DD"),
          color: selectedColorStart,
          secondaryColor: selectedColorEnd,
          animatedIcon: addedEmojis,
        };

        console.log("Creating holiday:", newHoliday);
        const response = await createHolidays(newHoliday).unwrap();
        console.log("Create response:", response);
        toast.success("Holiday created successfully");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving holiday:", error);
      toast.error(
        error?.data?.message || "Failed to save holiday. Please try again.",
      );
    }
  };

  const resetForm = () => {
    setHolidayName("");
    setHolidayDate(null);
    setSelectedColorStart("#3B82F6");
    setSelectedColorEnd("#8B5CF6");
    setAddedEmojis([]);
    setCustomEmoji("");
    setErrors({ name: "", date: "", emojis: "" });
    setEditingHoliday(null);
    setIsDialogOpen(false);
  };

  const handleEditHoliday = (holiday) => {
    setEditingHoliday(holiday);
    setHolidayName(holiday.name);
    setHolidayDate(dayjs(holiday.startDate));
    setSelectedColorStart(holiday.color);
    setSelectedColorEnd(holiday.secondaryColor);
    setAddedEmojis(holiday.animatedIcon || []);
    setCustomEmoji("");
    setErrors({ name: "", date: "", emojis: "" });
    setIsDialogOpen(true);
  };

  const handleDeleteHoliday = async (id) => {
    console.log(id);
    try {
      const response = await deleteHolidays({ id }).unwrap();
      console.log("Delete response:", response);
      toast.success("Holiday deleted successfully");
    } catch (error) {
      console.error("Error deleting holiday:", error);
      toast.error(
        error?.data?.message || "Failed to delete holiday. Please try again.",
      );
    }
  };

  const handleNameChange = (value) => {
    setHolidayName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const addEmoji = (emoji) => {
    if (addedEmojis.length < 15) {
      setAddedEmojis([...addedEmojis, emoji]);
      if (errors.emojis) {
        setErrors((prev) => ({ ...prev, emojis: "" }));
      }
    } else {
      toast.warning("Maximum 15 emojis reached");
    }
  };

  const addCustomEmojiToList = () => {
    if (customEmoji && addedEmojis.length < 15) {
      setAddedEmojis([...addedEmojis, customEmoji]);
      setCustomEmoji("");
      if (errors.emojis) {
        setErrors((prev) => ({ ...prev, emojis: "" }));
      }
    } else if (addedEmojis.length >= 15) {
      toast.warning("Maximum 15 emojis reached");
    }
  };

  const handleCustomEmojiChange = (value) => {
    // Filter out standard alphanumeric and punctuation, keeping mostly emojis/pictographs
    const emojiRegex = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;
    const matches = value.match(emojiRegex);
    setCustomEmoji(matches ? matches.join("") : "");
  };

  const removeEmojiAtIndex = (index) => {
    setAddedEmojis(addedEmojis.filter((_, idx) => idx !== index));
    if (errors.emojis) {
      setErrors((prev) => ({ ...prev, emojis: "" }));
    }
  };

  const handleEmojiClick = (eventId) => {
    setEmojiClickAnimation({ ...emojiClickAnimation, [eventId]: true });
    setTimeout(() => {
      setEmojiClickAnimation({ ...emojiClickAnimation, [eventId]: false });
    }, 600);
  };

  const handleDialogClose = () => {
    resetForm();
  };

  if (loadingAllHolidaysData) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h4" className="font-semibold mb-1">
            Holidays
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Manage and track your upcoming holidays
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<IoMdAdd />}
          onClick={() => setIsDialogOpen(true)}
          sx={{
            backgroundColor: "#2B7FFF",
            "&:hover": { backgroundColor: "#0891B2" },
            textTransform: "none",
          }}
        >
          Add Holiday
        </Button>
      </div>

      {/* Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <div className="flex items-center justify-between mr-5">
          <DialogTitle>
            {editingHoliday ? "Edit Holiday" : "Create New Holiday"}
          </DialogTitle>
          <IconButton
            onClick={handleDialogClose}
            size="small"
            className="flex items-center"
            sx={{
              backgroundColor: "#000",
              color: "white",
              width: 20,
              height: 20,
              "&:hover": { backgroundColor: "#DC2626" },
            }}
          >
            ×
          </IconButton>
        </div>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Holiday Name */}
            <div>
              <TextField
                fullWidth
                label="Holiday Name"
                placeholder="Enter holiday name"
                value={holidayName}
                onChange={(e) => handleNameChange(e.target.value)}
                error={!!errors.name}
                helperText={
                  errors.name || `${holidayName.length}/50 characters`
                }
                inputProps={{
                  maxLength: 50,
                }}
              />
            </div>

            {/* Holiday Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Holiday Date"
                value={holidayDate}
                onChange={(newValue) => {
                  setHolidayDate(newValue);
                  if (errors.date) {
                    setErrors((prev) => ({ ...prev, date: "" }));
                  }
                }}
                format="DD MMMM"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
              />
            </LocalizationProvider>

            {/* Color Selection */}
            <div className="flex items-center gap-5">
              <div>
                <p className="mb-2 font-medium">First Color (Gradient Start)</p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="color"
                    value={selectedColorStart}
                    onChange={(e) => setSelectedColorStart(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer rounded bg-[#e7e7e7]"
                  />
                  <TextField
                    size="small"
                    value={selectedColorStart}
                    onChange={(e) => setSelectedColorStart(e.target.value)}
                    placeholder="#3B82F6"
                    fullWidth
                    sx={{
                      bgcolor: "#e7e7e7",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {colorOptions.slice(0, 6).map((color) => (
                    <Tooltip key={color.value} title={color.name}>
                      <button
                        onClick={() => setSelectedColorStart(color.value)}
                        className="w-8 h-8 rounded hover:scale-110 transition-all cursor-pointer"
                        style={{ backgroundColor: color.value }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium">Second Color (Gradient End)</p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="color"
                    value={selectedColorEnd}
                    onChange={(e) => setSelectedColorEnd(e.target.value)}
                    className="w-16 h-10 rounded-lg p-1 cursor-pointer bg-[#e7e7e7]"
                  />
                  <TextField
                    size="small"
                    value={selectedColorEnd}
                    onChange={(e) => setSelectedColorEnd(e.target.value)}
                    placeholder="#8B5CF6"
                    fullWidth
                    sx={{
                      bgcolor: "#e7e7e7",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {colorOptions.slice(6, 12).map((color) => (
                    <Tooltip key={color.value} title={color.name}>
                      <button
                        onClick={() => setSelectedColorEnd(color.value)}
                        className="w-8 h-8 rounded hover:scale-110 transition-all cursor-pointer"
                        style={{ backgroundColor: color.value }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>

            {/* Gradient Preview */}
            <div>
              <Typography variant="body2" className="mb-2 font-medium">
                Gradient Preview
              </Typography>
              <div
                className="w-full h-16 rounded-lg border-2 border-gray-200"
                style={{
                  background: `linear-gradient(135deg, ${selectedColorStart}, ${selectedColorEnd})`,
                }}
              />
            </div>

            {/* Emoji Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Typography variant="body2" className="font-medium">
                  Animation Emojis (Click to Add)
                </Typography>
                <Chip
                  label={`${(addedEmojis || []).length}/15 (min 5)`}
                  size="small"
                  color={
                    (addedEmojis || []).length < 5
                      ? "error"
                      : (addedEmojis || []).length >= 15
                        ? "warning"
                        : "primary"
                  }
                />
              </div>
              {errors.emojis && (
                <Typography
                  variant="caption"
                  color="error"
                  className="mb-2 block"
                >
                  {errors.emojis}
                </Typography>
              )}

              <div className="grid grid-cols-10 gap-2 mb-3">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addEmoji(emoji)}
                    className="w-10 h-10 text-2xl rounded-lg bg-gray-100 hover:bg-cyan-100 hover:scale-110 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={addedEmojis.length >= 15}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <Typography
                variant="caption"
                className="text-gray-600 block mb-2"
              >
                Or add custom emoji
              </Typography>

              <div className="flex gap-2">
                <TextField
                  size="small"
                  value={customEmoji}
                  onChange={(e) => handleCustomEmojiChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomEmojiToList();
                    }
                  }}
                  placeholder="Type or paste emoji (e.g., 🚀)"
                  inputProps={{
                    maxLength: 2,
                    className: "text-2xl text-center",
                  }}
                  disabled={addedEmojis.length >= 15}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={addCustomEmojiToList}
                  disabled={addedEmojis.length >= 15 || !customEmoji}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#06B6D4",
                    "&:hover": { backgroundColor: "#0891B2" },
                  }}
                >
                  Add
                </Button>
              </div>

              {/* Added Emojis Preview */}
              <div className="mt-3">
                <Typography
                  variant="caption"
                  className="text-gray-600 block mb-2"
                >
                  Added Emojis Preview{" "}
                  {addedEmojis.length > 0 && `(${addedEmojis.length})`}:
                </Typography>
                {addedEmojis.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {addedEmojis.map((emoji, idx) => (
                      <div key={`${emoji}-${idx}`} className="relative group">
                        <div className="w-12 h-12 text-2xl rounded-lg bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center border-2 border-cyan-200">
                          {emoji}
                        </div>
                        <IconButton
                          onClick={() => removeEmojiAtIndex(idx)}
                          size="small"
                          className="absolute -top-14 -right-9 hidden group-hover:flex"
                          sx={{
                            backgroundColor: "#EF4444",
                            color: "white",
                            width: 20,
                            height: 20,
                            "&:hover": { backgroundColor: "#DC2626" },
                          }}
                        >
                          ×
                        </IconButton>
                        <div className="absolute bottom-4 -right-2 w-4 h-4 bg-gray-700 text-white text-[10px] rounded-full flex items-center justify-center">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                    Click emojis above to add them (minimum 5 required)
                  </div>
                )}
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              textTransform: "none",
              bgcolor: "#bbb",
              color: "black",
              "&:hover": { backgroundColor: "#aaa" },
            }}
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddHoliday}
            sx={{
              textTransform: "none",
              backgroundColor: "#06B6D4",
              "&:hover": { backgroundColor: "#0891B2" },
            }}
          >
            {editingHoliday ? "Update Holiday" : "Create Holiday"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Events Grid */}
      <div
        className={
          holidaysData.length > 0
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : ""
        }
      >
        {holidaysData && holidaysData.length > 0 ? (
          holidaysData.map((event) => {
            return (
              <HolidayCard
                key={event.id}
                event={event}
                handleEmojiClick={handleEmojiClick}
                handleEditHoliday={handleEditHoliday}
                handleDeleteHoliday={handleDeleteHoliday}
              />
            );
          })
        ) : (
          <NoDataFallback />
        )}
      </div>
    </div>
  );
}
