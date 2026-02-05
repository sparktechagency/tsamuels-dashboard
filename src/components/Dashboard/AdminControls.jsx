import { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Modal,
  Box,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  FaEye,
  FaTimes,
  FaUserShield,
  FaUsers,
  FaDollarSign,
  FaLock,
  FaExchangeAlt,
  FaGift,
} from "react-icons/fa";

import { toast } from "sonner";
import { MetricCard } from "../UI/MetricCard";
import {
  useGetAllFamiliesDataQuery,
  useGetAllUsersDataQuery,
  useGetPlanDistributionDataQuery,
  useGetStatusDistributionDataQuery,
  useGetUserAnalyticsDataQuery,
} from "../../Redux/slices/adminControlsApi";
import UserStatusChart from "../Chart/AdminControlsChart/UserStatusChart";
import PlanDistributionChart from "../Chart/AdminControlsChart/PlanDistributionChart";
import AdminActionsModal from "../UI/AdminActionsModal";
import dayjs from "dayjs";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 0,
  maxHeight: "90vh",
  overflow: "auto",
};

export default function AdminControls() {
  const { data: userAnalyticsData, isLoading: loadingUserAnalyticsData } =
    useGetUserAnalyticsDataQuery();
  const userAnalytics = userAnalyticsData?.data;

  const { data: userStatusData, isLoading: loadingUserStatusData } =
    useGetStatusDistributionDataQuery();
  const userStatus = userStatusData?.data;

  const userStatusChartData =
    userStatus &&
    Object.entries(userStatus).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value?.count,
      percentage: value.percentage,
    }));

  const { data: planDistributionData, isLoading: loadingPlanDistributionData } =
    useGetPlanDistributionDataQuery();
  const planDistribution = planDistributionData?.data;

  const planDistributionChartData =
    planDistribution &&
    Object.entries(planDistribution).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value?.count,
      percentage: value.percentage,
    }));

  const {
    data: allUsersData,
    isLoading: loadingAllUsersData,
    error: allUsersError,
  } = useGetAllUsersDataQuery();
  const allUsers = allUsersData?.data;
  if (allUsersError) console.error("Error fetching users:", allUsersError);
  // console.log("allUsers", allUsers);

  const {
    data: allFamiliesData,
    isLoading: loadingAllFamiliesData,
    error: allFamiliesError,
  } = useGetAllFamiliesDataQuery();
  // Ensure we access .data if that's where the array is, and fallback to []
  const allFamilies = allFamiliesData?.data?.result || [];
  if (allFamiliesError)
    console.error("Error fetching families:", allFamiliesError);
  // console.log("allFamilies", allFamilies);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const [actionInputs, setActionInputs] = useState({
    promoMonths: "",
    refundAmount: "",
    targetId: "",
    reason: "",
  });

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];
  const PLAN_COLORS = ["#94a3b8", "#3b82f6", "#8b5cf6"];

  const currentData = activeTab === 0 ? allUsers : allFamilies;
  console.log("currentData", currentData, activeTab);

  const filteredData =
    currentData &&
    currentData.length > 0 &&
    (currentData || []).filter((record) => {
      const query = searchQuery.toLowerCase();
      if (activeTab === 0) {
        return (
          record?.name.toLowerCase().includes(query) ||
          record?.email.toLowerCase().includes(query) ||
          record?._id.toLowerCase().includes(query) ||
          record?.familyId.toLowerCase().includes(query)
        );
      } else {
        return (
          record?.familyName.toLowerCase().includes(query) ||
          record?._id.toLowerCase().includes(query)
        );
      }
    });

  const paginatedData =
    filteredData &&
    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setActionInputs({
      promoMonths: "",
      refundAmount: "",
      targetId: "",
      reason: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setActionInputs({
      promoMonths: "",
      refundAmount: "",
      targetId: "",
      reason: "",
    });
  };

  // Admin action handlers
  const handleImpersonate = () => {
    toast.success(
      `Impersonating ${
        selectedRecord.name || selectedRecord.email
      } in read-only mode`,
    );
    closeModal();
  };

  const handleForcePasswordReset = () => {
    toast.success(`Password reset email sent to ${selectedRecord.email}`);
    closeModal();
  };

  const handleRevokeSessions = () => {
    toast.success(
      `All ${selectedRecord.sessionsActive || 0} active sessions revoked for ${
        selectedRecord.name
      }`,
    );
    closeModal();
  };

  const handleBlockUser = () => {
    if (
      confirm(
        `Are you sure you want to block ${selectedRecord.name}? They will not be able to access the app.`,
      )
    ) {
      toast.success(`User ${selectedRecord.name} has been blocked`);
      closeModal();
    }
  };

  const handleTransferOwnership = () => {
    if (!actionInputs.targetId) {
      toast.error("Please enter the new owner user ID");
      return;
    }
    toast.success(
      `Family ownership transferred from ${selectedRecord.owner} to ${actionInputs.targetId}`,
    );
    closeModal();
  };

  const handleMergeFamilies = () => {
    if (!actionInputs.targetId) {
      toast.error("Please enter the target family ID to merge with");
      return;
    }
    if (
      confirm(
        `Merge ${selectedRecord.name} with ${actionInputs.targetId}? This cannot be undone.`,
      )
    ) {
      toast.success(
        `Family ${selectedRecord.id} merged with ${actionInputs.targetId}`,
      );
      closeModal();
    }
  };

  const handleDeleteFamily = () => {
    if (
      confirm(
        `Permanently delete ${selectedRecord.name}? All data will be lost. This cannot be undone.`,
      )
    ) {
      toast.success(`Family ${selectedRecord.name} has been deleted`);
      closeModal();
    }
  };

  // const handleGrantPromo = () => {
  //   if (!actionInputs.promoMonths) {
  //     toast.error("Please enter number of promo months");
  //     return;
  //   }
  //   toast.success(
  //     `${actionInputs.promoMonths} promo months granted to ${selectedRecord.name}`
  //   );
  //   closeModal();
  // };

  // const handleCompPlan = () => {
  //   toast.success(`Premium plan comped for ${selectedRecord.name}`);
  //   closeModal();
  // };

  // const handleIssueRefund = () => {
  //   if (!actionInputs.refundAmount) {
  //     toast.error("Please enter refund amount");
  //     return;
  //   }
  //   toast.success(
  //     `Refund of $${actionInputs.refundAmount} issued to ${selectedRecord.name}`
  //   );
  //   closeModal();
  // };

  if (
    loadingUserAnalyticsData ||
    loadingUserStatusData ||
    loadingPlanDistributionData ||
    loadingAllUsersData ||
    loadingAllFamiliesData
  ) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Top Row Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Total Users"
          value={userAnalytics?.totalUsers.count}
          growth={userAnalytics?.totalUsers.growth}
          icon={FaUsers}
          subtitle={`${userAnalytics?.totalUsers.active} active`}
        />
        <MetricCard
          title="Premium Users"
          value={userAnalytics?.premiumUsers.count}
          growth={userAnalytics?.premiumUsers.growth}
          icon={FaDollarSign}
          subtitle={`${userAnalytics?.premiumUsers.conversionRate}% conversion`}
        />
        <MetricCard
          title="Total Families"
          value={userAnalytics?.totalFamilies.count}
          growth={userAnalytics?.totalFamilies.growth}
          icon={FaUsers}
          subtitle={`${userAnalytics?.totalFamilies.active} active`}
        />
        <MetricCard
          title="Blocked Users"
          value={userAnalytics?.blockedUsers.count}
          growth={userAnalytics?.blockedUsers.growth}
          icon={FaLock}
          subtitle={
            userAnalytics?.blockedUsers?.requiresAttention
              ? "Require Attention"
              : "No Action Needed"
          }
        />
      </div>

      {/* Charts Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <p
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              User Status Distribution
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Active, inactive, and blocked users
            </p>
            <UserStatusChart
              userStatusChartData={userStatusChartData}
              COLORS={COLORS}
            />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <p
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Plan Distribution
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "16px",
              }}
            >
              Free, premium, and trial users
            </p>
            <PlanDistributionChart
              planDistributionChartData={planDistributionChartData}
              PLAN_COLORS={PLAN_COLORS}
            />
          </CardContent>
        </Card>
      </div>

      {/* Data Table - Users & Families Management */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <TextField
            fullWidth
            placeholder={
              activeTab === 0
                ? "Search users by name, email, ID, or family ID..."
                : "Search families by name, ID, or owner..."
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </div>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
            setPage(0);
            setSearchQuery("");
          }}
        >
          <Tab label={`Users (${allUsers.length})`} />
          <Tab label={`Families (${allFamilies.length})`} />
        </Tabs>
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              {activeTab === 0 ? (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Active</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </>
              ) : (
                <>
                  <TableCell>Name</TableCell>
                  <TableCell>Plan</TableCell>

                  <TableCell>Members</TableCell>
                  <TableCell>Events</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => (
              <TableRow key={record.id} hover>
                {activeTab === 0 ? (
                  <>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.plan}
                        size="small"
                        color={
                          record.plan === "Premium"
                            ? "primary"
                            : record.plan === "Trial"
                              ? "info"
                              : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        color={
                          record.status === "active"
                            ? "success"
                            : record.status === "blocked"
                              ? "error"
                              : "default"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.onlineStatus?.lastSeen
                        ? dayjs(record.onlineStatus.lastSeen).format(
                            "MMM D, YYYY",
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleView(record)}
                        color="primary"
                      >
                        <FaEye size={16} />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{record.familyName}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.subscriptionPlan}
                        size="small"
                        color={
                          record.subscriptionPlan.includes("Premium")
                            ? "primary"
                            : "default"
                        }
                      />
                    </TableCell>

                    <TableCell>{record.members}</TableCell>
                    <TableCell>{record.totalEvents}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        color={
                          record.status === "active" ? "success" : "default"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {record.createdAt
                        ? dayjs(record.createdAt).format("MMM D, YYYY")
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleView(record)}
                        color="primary"
                      >
                        <FaEye size={16} />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Admin Actions Modal */}
      <AdminActionsModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalStyle={modalStyle}
        selectedRecord={selectedRecord}
        handleImpersonate={handleImpersonate}
        handleForcePasswordReset={handleForcePasswordReset}
        handleRevokeSessions={handleRevokeSessions}
        handleBlockUser={handleBlockUser}
        handleTransferOwnership={handleTransferOwnership}
        handleMergeFamilies={handleMergeFamilies}
        handleDeleteFamily={handleDeleteFamily}
        actionInputs={actionInputs}
        setActionInputs={setActionInputs}
      />
    </div>
  );
}
