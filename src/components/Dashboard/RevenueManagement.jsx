import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Modal,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const revenueData = [
  {
    id: 1,
    revenueName: "Consultation Services",
    revenueType: "Service Fee",
    amount: 15000,
    date: "2024-01-15",
  },
  {
    id: 2,
    revenueName: "Training Programs",
    revenueType: "Course Fee",
    amount: 25000,
    date: "2024-01-20",
  },
  {
    id: 3,
    revenueName: "Software Licensing",
    revenueType: "License Fee",
    amount: 50000,
    date: "2024-02-01",
  },
  {
    id: 4,
    revenueName: "Product Sales",
    revenueType: "Sales",
    amount: 35000,
    date: "2024-02-10",
  },
  {
    id: 5,
    revenueName: "Maintenance Contract",
    revenueType: "Recurring",
    amount: 20000,
    date: "2024-02-15",
  },
  {
    id: 6,
    revenueName: "Custom Development",
    revenueType: "Project Fee",
    amount: 45000,
    date: "2024-03-01",
  },
  {
    id: 7,
    revenueName: "Subscription Services",
    revenueType: "Recurring",
    amount: 12000,
    date: "2024-03-05",
  },
  {
    id: 8,
    revenueName: "Support Services",
    revenueType: "Service Fee",
    amount: 18000,
    date: "2024-03-15",
  },
  {
    id: 9,
    revenueName: "Workshop Series",
    revenueType: "Course Fee",
    amount: 22000,
    date: "2024-03-20",
  },
  {
    id: 10,
    revenueName: "Analytics Platform",
    revenueType: "License Fee",
    amount: 40000,
    date: "2024-04-01",
  },
];

const revenueTypes = [
  "Service Fee",
  "Course Fee",
  "License Fee",
  "Sales",
  "Recurring",
  "Project Fee",
];

export default function RevenueManagement() {
  const [searchText, setSearchText] = useState("");
  const [filteredRevenue, setFilteredRevenue] = useState(revenueData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editRevenue, setEditRevenue] = useState(null);

  const filterRevenue = (search) => {
    let filtered = revenueData;

    if (search) {
      filtered = filtered.filter((revenue) =>
        revenue.revenueName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRevenue(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (mode, revenue = null) => {
    setModalMode(mode);
    setEditRevenue(
      revenue || {
        id: Date.now(),
        revenueName: "",
        revenueType: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditRevenue(null);
  };

  const handleSaveRevenue = () => {
    if (modalMode === "edit") {
      const index = revenueData.findIndex((r) => r.id === editRevenue.id);
      if (index !== -1) {
        revenueData[index] = editRevenue;
      }
      setFilteredRevenue([...revenueData]);
    } else if (modalMode === "add") {
      revenueData.push(editRevenue);
      setFilteredRevenue([...revenueData]);
    }
    setOpenModal(false);
    setEditRevenue(null);
  };
  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    filterRevenue(search);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTotalRevenue = () => {
    return filteredRevenue.reduce((sum, revenue) => sum + revenue.amount, 0);
  };

  return (
    <div className="px-10 py-8 bg-[#fffffe] h-[92vh] overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Revenue Management
          </h1>
          <p className="text-[#2B7FFF] mt-2">
            Total Revenue:{" "}
            <span className="font-semibold text-lg">
              {formatCurrency(getTotalRevenue())}
            </span>
          </p>
        </div>
        <TextField
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#2B7FFF",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "20px",
            },
            height: "40px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          placeholder="Search by Revenue Name"
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="flex items-center justify-end gap-3 mb-6"></div>

      <div className="flex flex-col items-center">
        <TableContainer sx={{ border: "none", outline: "none" }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
                }}
              >
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Revenue Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Revenue Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRevenue
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((revenue) => (
                  <TableRow key={revenue.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {revenue.revenueName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {revenue.revenueType}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", fontWeight: "600" }}>
                      {formatCurrency(revenue.amount)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {new Date(revenue.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleOpenModal("edit", revenue)}
                      >
                        <AiOutlineEdit className="text-xl text-[#2B7FFF]" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 8, 10]}
          component="div"
          count={filteredRevenue.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Modal for Add/Edit Revenue */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-revenue-modal"
        aria-describedby="modal-to-edit-revenue"
      >
        <Box
          className="modal-content"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            backgroundColor: "white",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
          }}
        >
          <p className="text-center text-[#1A1A1A] font-semibold text-xl mb-4">
            {modalMode === "edit" ? "Edit Revenue" : "Add Revenue"}
          </p>
          <div className="flex flex-col gap-5 items-center">
            <TextField
              label="Revenue Name"
              value={editRevenue ? editRevenue.revenueName : ""}
              onChange={(e) =>
                setEditRevenue({
                  ...editRevenue,
                  revenueName: e.target.value,
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B7FFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2B7FFF",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px",
                },
                height: "50px",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
            />
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B7FFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2B7FFF",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px",
                },
                height: "50px",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
            >
              <InputLabel>Revenue Type</InputLabel>
              <Select
                value={editRevenue ? editRevenue.revenueType : ""}
                onChange={(e) =>
                  setEditRevenue({
                    ...editRevenue,
                    revenueType: e.target.value,
                  })
                }
                label="Revenue Type"
              >
                {revenueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={editRevenue ? editRevenue.amount : ""}
              onChange={(e) =>
                setEditRevenue({
                  ...editRevenue,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B7FFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2B7FFF",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px",
                },
                height: "50px",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Date"
              type="date"
              value={editRevenue ? editRevenue.date : ""}
              onChange={(e) =>
                setEditRevenue({
                  ...editRevenue,
                  date: e.target.value,
                })
              }
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2B7FFF",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2B7FFF",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px",
                },
                height: "50px",
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
            />
            <div className="flex items-center justify-end gap-2 w-full">
              <Button
                onClick={handleSaveRevenue}
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
                  width: "120px",
                  textTransform: "none",
                  borderRadius: "50px",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #00C4E3 0%, #1A6FEF 100%)",
                  },
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                sx={{
                  width: "120px",
                  color: "#00D3F2",
                  border: "2px solid #00D3F2",
                  textTransform: "none",
                  borderRadius: "50px",
                  "&:hover": {
                    border: "2px solid #00C4E3",
                    backgroundColor: "rgba(0, 211, 242, 0.04)",
                  },
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
