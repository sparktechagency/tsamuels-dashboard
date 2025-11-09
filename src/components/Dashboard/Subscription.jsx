import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Switch,
  Chip,
  Typography,
  InputAdornment,
  Stack,
  Card,
  CardContent,
  CardActions,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FaSearch, FaDollarSign, FaCalendarAlt, FaCheck } from "react-icons/fa";

const initialSubscriptions = [
  {
    id: 1,
    name: "Basic Plan",
    price: 9.99,
    duration: "Monthly",
    features: ["5 Events", "Basic Support", "Community Access"],
    isVisible: true,
  },
  {
    id: 2,
    name: "Family Pro",
    price: 19.99,
    duration: "Monthly",
    features: [
      "Unlimited Events",
      "Priority Support",
      "Mentor Access",
      "Analytics",
    ],
    isVisible: true,
  },
  {
    id: 3,
    name: "Annual Saver",
    price: 99.99,
    duration: "Yearly",
    features: ["All Pro Features", "20% Discount", "Early Access"],
    isVisible: false,
  },
];

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [filteredSubscriptions, setFilteredSubscriptions] =
    useState(initialSubscriptions);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentSubscription, setCurrentSubscription] = useState({
    name: "",
    price: "",
    duration: "Monthly",
    features: [""],
    isVisible: true,
  });

  // Delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  // Modal Handlers
  const handleOpenModal = (mode, sub = null) => {
    setModalMode(mode);
    if (mode === "edit" && sub) {
      setCurrentSubscription({ ...sub });
    } else {
      setCurrentSubscription({
        name: "",
        price: "",
        duration: "Monthly",
        features: [""],
        isVisible: true,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSubscription({
      name: "",
      price: "",
      duration: "Monthly",
      features: [""],
      isVisible: true,
    });
  };

  // Features
  const handleFeatureChange = (index, value) => {
    const updated = [...currentSubscription.features];
    updated[index] = value;
    setCurrentSubscription({ ...currentSubscription, features: updated });
  };

  const addFeatureField = () => {
    setCurrentSubscription({
      ...currentSubscription,
      features: [...currentSubscription.features, ""],
    });
  };

  const removeFeatureField = (index) => {
    const updated = currentSubscription.features.filter((_, i) => i !== index);
    setCurrentSubscription({ ...currentSubscription, features: updated });
  };

  // Save
  const handleSaveSubscription = () => {
    const cleanedFeatures = currentSubscription.features.filter((f) =>
      f.trim()
    );
    const newSub = {
      ...currentSubscription,
      id: modalMode === "add" ? Date.now() : currentSubscription.id,
      features: cleanedFeatures,
    };

    let updated;
    if (modalMode === "add") {
      updated = [...subscriptions, newSub];
    } else {
      updated = subscriptions.map((s) => (s.id === newSub.id ? newSub : s));
    }

    setSubscriptions(updated);
    setFilteredSubscriptions(updated);
    handleCloseModal();
  };

  // Toggle Visibility
  const toggleVisibility = (id) => {
    const updated = subscriptions.map((s) =>
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    );
    setSubscriptions(updated);
    setFilteredSubscriptions(updated);
  };

  // Delete
  const handleDelete = (sub) => {
    setSubscriptionToDelete(sub);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = subscriptions.filter(
      (s) => s.id !== subscriptionToDelete.id
    );
    setSubscriptions(updated);
    setFilteredSubscriptions(updated);
    setOpenDeleteModal(false);
    setSubscriptionToDelete(null);
  };

  return (
    <div className="px-6 py-8 bg-[#fffffe] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Subscription Plans
          </h1>
          <p className="text-[#2B7FFF] mt-1">Create and manage pricing tiers</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={() => handleOpenModal("add")}
            startIcon={<AiOutlinePlus />}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1px",
              textTransform: "none",
              bgcolor: "#2B7FFF",
              color: "white",
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#00D3F2",
                color: "black",
              },
            }}
          >
            Add Plan
          </Button>
        </div>
      </div>

      {/* Cards Container - Using div + Flexbox */}
      <div className="flex flex-wrap -mx-4">
        {filteredSubscriptions.length === 0 ? (
          <div className="w-full text-center py-12">
            <p className="text-gray-500">No subscription plans found.</p>
          </div>
        ) : (
          filteredSubscriptions.map((sub) => (
            <div key={sub.id} className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
              <div
                className="h-full flex flex-col bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-xl relative"
                style={{ opacity: sub.isVisible ? 1 : 0.5 }}
              >
                <div className="flex-1 p-6 pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {sub.name}
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sub.isVisible}
                        onChange={() => toggleVisibility(sub.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2B7FFF]"></div>
                    </label>
                  </div>

                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-[#2B7FFF]">
                      ${sub.price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{sub.duration.toLowerCase()}
                    </span>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <div className="space-y-2">
                    {sub.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FaCheck size={14} className="text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 pt-2 flex justify-between border-t border-gray-100">
                  <IconButton
                    onClick={() => handleOpenModal("edit", sub)}
                    sx={{
                      color: "#fff",
                      bgcolor: "#CC5500",
                      ":hover": {
                        bgcolor: "#fff",
                        color: "#CC5500",
                        border: "0.5px solid #CC5500",
                      },
                    }}
                  >
                    <AiOutlineEdit size={20} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(sub)}
                    sx={{
                      bgcolor: "red",
                      color: "white",
                      ":hover": {
                        bgcolor: "white",
                        color: "red",
                        border: "0.5px solid red",
                      },
                    }}
                  >
                    <AiOutlineDelete size={20} />
                  </IconButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 700 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>
            {modalMode === "edit" ? "Edit Plan" : "Create New Plan"}
          </Typography>

          <Box sx={{ display: "grid", gap: 3 }}>
            <TextField
              label="Plan Name"
              value={currentSubscription.name}
              onChange={(e) =>
                setCurrentSubscription({
                  ...currentSubscription,
                  name: e.target.value,
                })
              }
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
            />

            <div className="flex gap-2">
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={currentSubscription.price}
                onChange={(e) =>
                  setCurrentSubscription({
                    ...currentSubscription,
                    price: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDollarSign />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                }}
              />
              <Select
                labelId="billing-cycle-label"
                label="Billing Cycle"
                fullWidth
                value={currentSubscription.duration}
                onChange={(e) =>
                  setCurrentSubscription({
                    ...currentSubscription,
                    duration: e.target.value,
                  })
                }
                sx={{
                  flex: 1,
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                  },
                }}
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Yearly">Yearly</MenuItem>
              </Select>
            </div>

            <Box>
              <Typography fontWeight="medium" mb={1}>
                Features
              </Typography>
              {currentSubscription.features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. Unlimited Events"
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                    }}
                  />
                  {currentSubscription.features.length > 1 && (
                    <IconButton
                      onClick={() => removeFeatureField(index)}
                      color="error"
                      size="small"
                    >
                      <AiOutlineDelete />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                onClick={addFeatureField}
                size="small"
                sx={{ mt: 1, color: "#2B7FFF" }}
              >
                + Add Feature
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                onClick={handleCloseModal}
                sx={{
                  border: "1px solid #2B7FFF",
                  color: "#2B7FFF",
                  borderRadius: "50px",
                  px: 3,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSubscription}
                variant="contained"
                sx={{
                  bgcolor: "#2B7FFF",
                  color: "white",
                  borderRadius: "50px",
                  px: 4,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#2B7FFF", boxShadow: "initial" },
                }}
              >
                {modalMode === "edit" ? "Update" : "Create"} Plan
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Delete Plan?
          </Typography>
          <Typography mb={3}>
            Remove <strong>{subscriptionToDelete?.name}</strong> permanently?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              onClick={() => setOpenDeleteModal(false)}
              sx={{
                border: "1px solid #2B7FFF",
                color: "#2B7FFF",
                borderRadius: "10px",
                textTransform: "none",
                width: "80px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              sx={{
                bgcolor: "#ee443f",
                color: "white",
                borderRadius: "10px",
                textTransform: "none",
                width: "80px",
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
