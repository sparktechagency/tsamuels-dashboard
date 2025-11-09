import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  IconButton,
  Chip,
  Typography,
  InputAdornment,
  Stack,
  Card,
  CardContent,
  CardActions,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import {
  FaSearch,
  FaDollarSign,
  FaCheck,
  FaUsers,
  FaCrown,
} from "react-icons/fa";
import ManageSubscriptionModal from "../UI/ManageSubscriptionModal";
import DeleteSubscriptionModal from "../UI/DeleteSubscriptionModal";

const initialSubscriptions = [
  {
    id: 1,
    name: "Dual Admin",
    description: "Up to 2 Admin Users",
    price: 4.99,
    icon: "users",
    isPopular: false,
    isVisible: true,
    features: [
      "All premium features included",
      "AI-powered scheduling assistant",
      "Real-time traffic updates",
      "Weather integration",
      "Smart notifications",
      "Family calendar sync",
      "Private & secure",
    ],
  },
  {
    id: 2,
    name: "Family Plan",
    description: "Unlimited Admin Users",
    price: 10.99,
    icon: "crown",
    isPopular: true,
    isVisible: true,
    features: [
      "All premium features included",
      "AI-powered scheduling assistant",
      "Real-time traffic updates",
      "Weather integration",
      "Smart notifications",
      "Family calendar sync",
      "Private & secure",
    ],
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
    description: "",
    price: "",
    icon: "users",
    isPopular: false,
    features: [""],
    isVisible: true,
  });

  // Delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  // Modal
  const handleOpenModal = (mode, sub = null) => {
    setModalMode(mode);
    if (mode === "edit" && sub) {
      setCurrentSubscription({ ...sub });
    } else {
      setCurrentSubscription({
        name: "",
        description: "",
        price: "",
        icon: "users",
        isPopular: false,
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
      description: "",
      price: "",
      icon: "users",
      isPopular: false,
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-[#1a1a1a]">
              Subscription Plans
            </p>
            <p className="text-[#2B7FFF]">Manage and customize pricing tiers</p>
          </div>

          <Button
            onClick={() => handleOpenModal("add")}
            startIcon={<AiOutlinePlus />}
            sx={{
              bgcolor: "#3B82F6",
              color: "white",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              fontWeight: 600,
              "&:hover": { bgcolor: "#2563EB" },
            }}
          >
            Add Plan
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubscriptions.length === 0 ? (
            <Box gridColumn="1 / -1" textAlign="center" py={10}>
              <Typography color="text.secondary">No plans found.</Typography>
            </Box>
          ) : (
            filteredSubscriptions.map((plan) => (
              <Card
                key={plan.id}
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  position: "relative",
                  overflow: "visible",
                  bgcolor: "#fff",
                  transition: "all 0.3s ease",
                  opacity: plan.isVisible ? 1 : 0.6,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <Chip
                    label="Most Popular"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#3B82F6",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      px: 2,
                      borderRadius: "9999px",
                      zIndex: 10,
                    }}
                  />
                )}

                <CardContent sx={{ pt: 3, pb: 2 }}>
                  {/* Icon & Title */}
                  <div className="flex flex-col items-center mb-1">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                      style={{
                        backgroundColor:
                          plan.icon === "crown" ? "#F3E8FF" : "#F1F5F9",
                      }}
                    >
                      {plan.icon === "crown" ? (
                        <FaCrown size={28} color="#A78BFA" />
                      ) : (
                        <FaUsers size={26} color="#94A3B8" />
                      )}
                    </div>
                    <p className="font-bold text-lg text-[#1a1a1a]">
                      {plan.name}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#3B82F6]">
                      ${plan.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-[#6b6b6b]">Per month</p>
                  </div>

                  <Divider sx={{ my: 2 }} />

                  {/* Features */}
                  <Stack spacing={1.5} mb={2}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="#1A1A1A"
                    >
                      What's included:
                    </Typography>
                    {plan.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        display="flex"
                        alignItems="flex-start"
                        gap={1.5}
                      >
                        <FaCheck
                          size={16}
                          color="#10B981"
                          style={{ marginTop: "2px" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontSize="0.875rem"
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ justifyContent: "center", gap: 1, pb: 3 }}>
                  <IconButton
                    onClick={() => handleOpenModal("edit", plan)}
                    sx={{
                      bgcolor: "#3B82F6",
                      color: "white",
                      "&:hover": { bgcolor: "#2563EB" },
                    }}
                  >
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(plan)}
                    sx={{
                      bgcolor: "#EF4444",
                      color: "white",
                      "&:hover": { bgcolor: "#DC2626" },
                    }}
                  >
                    <AiOutlineDelete />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <ManageSubscriptionModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        currentSubscription={currentSubscription}
        setCurrentSubscription={setCurrentSubscription}
        modalMode={modalMode}
        handleFeatureChange={handleFeatureChange}
        removeFeatureField={removeFeatureField}
        addFeatureField={addFeatureField}
        handleSaveSubscription={handleSaveSubscription}
      />

      {/* Delete Modal */}
      <DeleteSubscriptionModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        subscriptionToDelete={subscriptionToDelete}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}
