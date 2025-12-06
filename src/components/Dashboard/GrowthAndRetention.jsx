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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaTimes,
  FaUserPlus,
  FaUsers,
  FaMapMarkerAlt,
  FaChartLine,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { toast } from "sonner";
import {
  allFunnelData,
  allGeoData,
  allInviteData,
  allRetentionData,
  generateCohortData,
} from "../../../public/data/growthData";
import ConversionChart from "../Chart/GrowthChart/ConversionChart";
import CohortChart from "../Chart/GrowthChart/CohortChart";

export function GrowthRetention() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Year filters for each chart
  const [funnelYear, setFunnelYear] = useState("2025");
  const [retentionYear, setRetentionYear] = useState("2025");
  const [inviteYear, setInviteYear] = useState("2025");
  const [geoYear, setGeoYear] = useState("2025");

  const funnelData = allFunnelData[funnelYear];
  const retentionData = allRetentionData[retentionYear];
  const inviteData = allInviteData[inviteYear];
  const geoData = allGeoData[geoYear];

  const COLORS = [
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#dbeafe",
    "#bfdbfe",
    "#e0e7ff",
  ];

  const cohortData = generateCohortData();

  const filteredData = cohortData.filter((record) =>
    record.cohort.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedRecord(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    if (confirm(`Are you sure you want to delete cohort ${record.cohort}?`)) {
      toast.success(`Cohort ${record.cohort} deleted successfully`);
      console.log("Deleting:", record);
    }
  };

  const handleSave = () => {
    if (modalMode === "add") {
      toast.success("Cohort added successfully");
    } else {
      toast.success("Cohort updated successfully");
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Charts Row 1: Conversion Funnel & Cohort Retention */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
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
              <p className="text-lg font-semibold">Conversion Funnel</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={funnelYear}
                  onChange={(e) => setFunnelYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
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
              Signup to paid user journey
            </p>
            <ConversionChart funnelData={funnelData} />
          </CardContent>
        </Card>

        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-semibold">Cohort Retention</p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={retentionYear}
                  onChange={(e) => setRetentionYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="text-sm text-[#6b7280] mb-6">
              Retention rates at day 7, 30, and 60
            </p>
            <CohortChart retentionData={retentionData} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Invite Metrics & Geographic Distribution */}
      <div
        className="grid gap-6 mb-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <div className="flex justify-between items-center mb-1">
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Invite Metrics
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={inviteYear}
                  onChange={(e) => setInviteYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
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
              Invites sent and acceptance rates
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={inviteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sent"
                  fill="#93c5fd"
                  name="Invites Sent"
                />
                <Bar
                  yAxisId="left"
                  dataKey="accepted"
                  fill="#3b82f6"
                  name="Accepted"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Accept Rate %"
                />
              </ComposedChart>
            </ResponsiveContainer>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Users by State
              </p>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                  value={geoYear}
                  onChange={(e) => setGeoYear(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    background: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(59, 130, 246)",
                    },
                  }}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
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
              Geographic distribution of users
            </p>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={geoData.byState}
                  dataKey="users"
                  nameKey="state"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.state}: ${entry.percent}%`}
                >
                  {geoData.byState.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Zip Codes Card */}
      <Card
        elevation={2}
        sx={{
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          mb: 3,
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
            Top Zip Codes
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "#6b7280",
              marginBottom: "24px",
            }}
          >
            Highest user concentration areas
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {geoData.byZip.map((item, index) => (
              <div
                key={item.zip}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ color: COLORS[index], fontSize: "20px" }}
                  />
                  <p
                    style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700 }}
                  >
                    {item.zip}
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  {item.city}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#3b82f6",
                  }}
                >
                  {item.users} users
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <TextField
            fullWidth
            placeholder="Search by cohort..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <Button
            variant="contained"
            startIcon={<FaPlus size={16} />}
            onClick={handleAdd}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              whiteSpace: "nowrap",
            }}
          >
            Add Cohort
          </Button>
        </div>
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell>Cohort</TableCell>
              <TableCell>Signups</TableCell>
              <TableCell>Day 7</TableCell>
              <TableCell>Day 30</TableCell>
              <TableCell>Day 60</TableCell>
              <TableCell>Invites</TableCell>
              <TableCell>Accept Rate</TableCell>
              <TableCell>Top State</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((record) => {
              const acceptRate = (
                (record.invitesAccepted / record.invitesSent) *
                100
              ).toFixed(1);

              return (
                <TableRow key={record.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {record.cohort}
                  </TableCell>
                  <TableCell>{record.signups}</TableCell>
                  <TableCell>{record.day7Retention}%</TableCell>
                  <TableCell>{record.day30Retention}%</TableCell>
                  <TableCell>{record.day60Retention}%</TableCell>
                  <TableCell>{record.invitesSent}</TableCell>
                  <TableCell>{acceptRate}%</TableCell>
                  <TableCell>{record.topState}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "4px",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleView(record)}
                      >
                        <FaEye size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(record)}
                      >
                        <FaEdit size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(record)}
                      >
                        <FaTrash size={16} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {modalMode === "view"
              ? "View Cohort"
              : modalMode === "edit"
              ? "Edit Cohort"
              : "Add Cohort"}
          </span>
          <IconButton onClick={closeModal} size="small">
            <FaTimes size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {modalMode === "view" && selectedRecord ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginTop: "8px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Cohort
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.cohort}</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Signups
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.signups}</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Day 7 Retention
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.day7Retention}%</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Day 30 Retention
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.day30Retention}%</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Day 60 Retention
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.day60Retention}%</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Invites Sent
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.invitesSent}</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Invites Accepted
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.invitesAccepted}</p>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  Top State
                </p>
                <p style={{ margin: 0 }}>{selectedRecord.topState}</p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                marginTop: "8px",
              }}
            >
              <TextField
                fullWidth
                label="Cohort"
                defaultValue={selectedRecord?.cohort || ""}
                size="small"
                placeholder="e.g., Dec 2024"
                sx={{ gridColumn: "1 / -1" }}
              />
              <TextField
                fullWidth
                label="Signups"
                type="number"
                defaultValue={selectedRecord?.signups || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Day 7 Retention (%)"
                type="number"
                defaultValue={selectedRecord?.day7Retention || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Day 30 Retention (%)"
                type="number"
                defaultValue={selectedRecord?.day30Retention || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Day 60 Retention (%)"
                type="number"
                defaultValue={selectedRecord?.day60Retention || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Invites Sent"
                type="number"
                defaultValue={selectedRecord?.invitesSent || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Invites Accepted"
                type="number"
                defaultValue={selectedRecord?.invitesAccepted || 0}
                size="small"
              />
              <TextField
                fullWidth
                label="Top State"
                defaultValue={selectedRecord?.topState || ""}
                size="small"
              />
            </div>
          )}
        </DialogContent>

        {modalMode !== "view" && (
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button onClick={closeModal} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ textTransform: "none" }}
            >
              {modalMode === "edit" ? "Save Changes" : "Add Cohort"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
