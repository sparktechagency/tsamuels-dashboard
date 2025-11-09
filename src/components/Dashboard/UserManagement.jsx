import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const usersData = [
  {
    name: "Alice Johnson",
    userName: "alicej",
    email: "alice.johnson@example.com",
    location: "New York, USA",
    status: "Active",
    joinedDate: "2024-01-15",
    children: 1,
    interests: ["Toddler Playdates", "Parenting Workshops"],
    eventsAttended: 8,
  },
  {
    name: "Bob Smith",
    userName: "bobsmith",
    email: "bob.smith@example.com",
    location: "Los Angeles, USA",
    status: "Inactive",
    joinedDate: "2023-11-20",
    children: 2,
    interests: ["School Events", "Outdoor Activities"],
    eventsAttended: 12,
  },
  {
    name: "Carol White",
    userName: "carolw",
    email: "carol.white@example.com",
    location: "Chicago, USA",
    status: "Active",
    joinedDate: "2023-08-10",
    children: 3,
    interests: ["Teen Workshops", "Family Camps"],
    eventsAttended: 25,
  },
  // ... other users (same as before)
  // Add the same extra fields to all users for consistency
];

export default function UserManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedUser(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="px-10 py-8 bg-[#fdfdfd] h-[92vh] overflow-auto">
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <TextField
          placeholder="Search by Name, Email or Username"
          value={searchText}
          onChange={handleSearchChange}
          sx={{
            width: 350,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: "44px",
              "&.Mui-focused fieldset": { borderColor: "#2B7FFF" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch color="#2B7FFF" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
              }}
            >
              {["Name", "Email", "Location", "Status", "Action"].map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user.email}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenModal(user)}
                >
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.location}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                      sx={{ fontWeight: 600, minWidth: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(user);
                      }}
                    >
                      <FiEye className="text-lg text-[#2B7FFF]" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Enhanced User Details Modal */}
      <Modal open={openDetailsModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: 600 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: { xs: 3, sm: 4 },
          }}
        >
          {selectedUser && (
            <>
              {/* Header with Avatar & Close */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor: "#2B7FFF",
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="#1A1A1A">
                      {selectedUser.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{selectedUser.userName}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseModal} sx={{ color: "#666" }}>
                  <IoClose size={24} />
                </IconButton>
              </Box>

              {/* Badges */}
              <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                <Chip
                  label={selectedUser.status}
                  color={getStatusColor(selectedUser.status)}
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {/* Details Grid */}
              <Box sx={{ display: "grid", gap: 2.5 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="medium" color="text.secondary">
                    Email
                  </Typography>
                  <Typography fontWeight="600">{selectedUser.email}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="medium" color="text.secondary">
                    Location
                  </Typography>
                  <Typography fontWeight="600">
                    {selectedUser.location}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="medium" color="text.secondary">
                    Children
                  </Typography>
                  <Typography fontWeight="600">
                    {selectedUser.children} child(ren)
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="medium" color="text.secondary">
                    Joined
                  </Typography>
                  <Typography fontWeight="600">
                    {new Date(selectedUser.joinedDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="medium" color="text.secondary">
                    Events Attended
                  </Typography>
                  <Typography fontWeight="600">
                    {selectedUser.eventsAttended}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    fontWeight="medium"
                    color="text.secondary"
                    gutterBottom
                  >
                    Interests
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    {selectedUser.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        sx={{ backgroundColor: "#E3F2FD", color: "#1976D2" }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
