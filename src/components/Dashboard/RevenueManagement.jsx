import { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  FaEye,
  FaTimes,
  FaDollarSign,
  FaChartLine,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { MetricCard } from "../UI/MetricCard";
import {
  useGetPlanMixDistributionDataQuery,
  useGetRecognizedRevenueDataQuery,
  useGetRevenueMetricsDataQuery,
  useGetRevenueTrendsDataQuery,
  useGetSubscriptionHistoryDataQuery,
  useGetTrialToPaidDataQuery,
  useGetUpgradesAndDowngradesDataQuery,
} from "../../Redux/slices/revenueApi";

import RevenueTrendsChart from "../Chart/RevenueChart/RevenueTrendsChart";
import TrialToPaidChart from "../Chart/RevenueChart/TrialToPaidChart";
import PlanMixDistributionChart from "../Chart/RevenueChart/PlanMixDistributionChart";
import RecognitionChart from "../Chart/RevenueChart/RecognitionChart";
import UpgradesAndDowngradesChart from "../Chart/RevenueChart/UpgradesAndDowngradesChart";
import { NoDataFallback } from "../utils/noDataFallBack";

export default function RevenueManagement() {
  const currentYear = new Date().getFullYear().toString();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Year filters for each chart
  const [mrrYear, setMrrYear] = useState(currentYear);
  const [conversionYear, setConversionYear] = useState(currentYear);
  const [planMixYear, setPlanMixYear] = useState(currentYear);
  const [recognizedYear, setRecognizedYear] = useState(currentYear);
  const [upDownYear, setUpDownYear] = useState(currentYear);

  const { data: revenueMetricsData, isLoading: loadingRevenueMetricsData } =
    useGetRevenueMetricsDataQuery();
  const revenueMetrics = revenueMetricsData?.data;

  const { data: revenueTrendsData, isLoading: loadingRevenueTrendsData } =
    useGetRevenueTrendsDataQuery(mrrYear);
  const revenueTrends = revenueTrendsData?.data;

  const { data: trialToPaidData, isLoading: loadingTrialToPaidData } =
    useGetTrialToPaidDataQuery(conversionYear);
  const trialToPaid = trialToPaidData?.data;

  const {
    data: planMixDistributionData,
    isLoading: loadingPlanMixDistributionData,
  } = useGetPlanMixDistributionDataQuery(conversionYear);
  const planMixDistribution = planMixDistributionData?.data;

  const {
    data: upgradesAndDowngradesData,
    isLoading: loadingUpgradesAndDowngradesData,
  } = useGetUpgradesAndDowngradesDataQuery(upDownYear);
  const upgradesAndDowngrades = upgradesAndDowngradesData?.data;

  const {
    data: recognizedRevenueData,
    isLoading: loadingRecognizedRevenueData,
  } = useGetRecognizedRevenueDataQuery(recognizedYear);
  const recognizedRevenue = recognizedRevenueData?.data;

  const {
    data: subscriptionHistoiryData,
    isLoading: loadingSubscriptionHistoiryData,
  } = useGetSubscriptionHistoryDataQuery(recognizedYear);
  const subscriptionHistory = subscriptionHistoiryData?.data?.result;
  console.log("subscriptionHistoiry", subscriptionHistory);

  const COLORS = [
    "#3b82f6", // bright blue
    "#2563eb", // deeper blue
    "#1d4ed8", // strong blue
    "#1e40af", // bold blue
    "#6366f1", // indigo
    "#4f46e5", // deep indigo
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // No longer blocking the whole page with a global loader

  return (
    <div style={{ padding: "32px" }}>
      {/* Top Row Metrics - Revenue KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <MetricCard
          title="Monthly Recurring Revenue"
          value={
            loadingRevenueMetricsData ? (
              <CircularProgress size={20} />
            ) : revenueMetrics?.mrr?.value ? (
              `$${(revenueMetrics.mrr.value / 1000).toFixed(1)}k`
            ) : (
              "$0.0k"
            )
          }
          growth={revenueMetrics?.mrr?.growth ?? 0}
          icon={FaDollarSign}
          subtitle="MRR"
        />
        <MetricCard
          title="Annual Recurring Revenue"
          value={
            loadingRevenueMetricsData ? (
              <CircularProgress size={20} />
            ) : revenueMetrics?.arr?.value ? (
              `$${(revenueMetrics.arr.value / 1000).toFixed(0)}k`
            ) : (
              "$0k"
            )
          }
          growth={revenueMetrics?.arr?.growth ?? 0}
          icon={FaChartLine}
          subtitle="ARR"
        />
        <MetricCard
          title="Average Revenue Per User"
          value={
            loadingRevenueMetricsData ? (
              <CircularProgress size={20} />
            ) : revenueMetrics?.arpu?.value ? (
              `$${revenueMetrics.arpu.value.toFixed(2)}`
            ) : (
              "$0.00"
            )
          }
          growth={revenueMetrics?.arpu?.growth ?? 0}
          icon={FaUsers}
          subtitle="ARPU"
        />
        <MetricCard
          title="Customer Acq. Payback"
          value={
            loadingRevenueMetricsData ? (
              <CircularProgress size={20} />
            ) : revenueMetrics?.paybackPeriod?.months ? (
              `${revenueMetrics.paybackPeriod.months.toFixed(1)} mo`
            ) : (
              "0.0 mo"
            )
          }
          growth={revenueMetrics?.paybackPeriod?.growth ?? 0}
          icon={FaClock}
          subtitle="Payback Period"
        />
      </div>

      {/* Charts Row 1: MRR/ARR Trend & Trial to Paid Conversion */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                MRR, ARR & ARPU Trends
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={mrrYear}
                  onChange={(e) => setMrrYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Revenue metrics and customer value
            </p>
            {loadingRevenueTrendsData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : revenueTrends && revenueTrends.length > 0 ? (
              <RevenueTrendsChart revenueTrends={revenueTrends} />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Trial to Paid Conversion
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={conversionYear}
                  onChange={(e) => setConversionYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Trial users converting to paid plans
            </p>
            {loadingTrialToPaidData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : trialToPaid && trialToPaid.length > 0 ? (
              <TrialToPaidChart trialToPaid={trialToPaid} />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Plan Mix Distribution & Upgrades/Downgrades */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Plan Mix Distribution
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={planMixYear}
                  onChange={(e) => setPlanMixYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Subscriber distribution across plans
            </p>
            {loadingPlanMixDistributionData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : planMixDistribution && planMixDistribution.length > 0 ? (
              <PlanMixDistributionChart
                planMixDistribution={planMixDistribution}
                COLORS={COLORS}
              />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>

        {/* upgrades & downgrades */}
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Upgrades & Downgrades
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={upDownYear}
                  onChange={(e) => setUpDownYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Plan tier changes over time
            </p>
            {loadingUpgradesAndDowngradesData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : upgradesAndDowngrades && upgradesAndDowngrades.length > 0 ? (
              <UpgradesAndDowngradesChart
                upgradesAndDowngrades={upgradesAndDowngrades}
              />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3: Revenue Adjustments & Family vs Individual */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Discounts, Refunds & Revenue Recognition
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={recognizedYear}
                  onChange={(e) => setRecognizedYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Payment adjustments and recognized revenue
            </p>
            {loadingRecognizedRevenueData ? (
              <div className="flex justify-center items-center h-[300px]">
                <CircularProgress />
              </div>
            ) : recognizedRevenue && recognizedRevenue.length > 0 ? (
              <RecognitionChart recognizedRevenue={recognizedRevenue} />
            ) : (
              <NoDataFallback />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell>Discount</TableCell> */}
              <TableCell>Status</TableCell>
              {/* <TableCell>Payment Method</TableCell> */}
              <TableCell>Next Billing</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingSubscriptionHistoiryData ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : subscriptionHistory && subscriptionHistory.length > 0 ? (
              subscriptionHistory.map((record) => (
                <TableRow key={record.id} hover>
                  <TableCell>
                    <div>
                      <div>{record.userName}</div>
                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {record.userId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.plan}
                      size="small"
                      color={
                        record.plan.includes("Annual") ? "primary" : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>${record.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      size="small"
                      color={
                        record.status === "Active"
                          ? "success"
                          : record.status === "Trial"
                            ? "info"
                            : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>{record.nextBilling}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleView(record)}>
                      <FaEye size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 0 }}>
                  <NoDataFallback />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={subscriptionHistory?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            borderRadius: 4,
            width: 600,
            p: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2>View Subscription</h2>
            <IconButton onClick={closeModal}>
              <FaTimes size={20} />
            </IconButton>
          </div>

          {selectedRecord && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              <div>
                <p className="label">User Name</p>
                <p>{selectedRecord.userName}</p>
              </div>
              <div>
                <p className="label">User ID</p>
                <p style={{ fontFamily: "monospace" }}>
                  {selectedRecord.userId}
                </p>
              </div>
              <div>
                <p className="label">Plan</p>
                <p>{selectedRecord.plan}</p>
              </div>
              <div>
                <p className="label">Amount</p>
                <p>${selectedRecord.amount}</p>
              </div>
              <div>
                <p className="label">Discount</p>
                <p>
                  {selectedRecord.discount > 0
                    ? `$${selectedRecord.discount}`
                    : "None"}
                </p>
              </div>
              <div>
                <p className="label">Status</p>
                <p>{selectedRecord.status}</p>
              </div>
              <div>
                <p className="label">Payment Method</p>
                <p>{selectedRecord.paymentMethod}</p>
              </div>
              <div>
                <p className="label">Next Billing</p>
                <p>{selectedRecord.nextBilling}</p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
