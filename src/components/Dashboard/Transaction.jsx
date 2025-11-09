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
} from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import TransactionDetailsModal from "../UI/TransactionDetailsModal";

const transactionData = [
  {
    id: 1,
    transactionId: "TXN001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    customerPhone: "+1 (555) 123-4567",
    transactionType: "Purchase",
    amount: 1500,
    date: "2024-01-15",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Premium subscription package",
  },
  {
    id: 2,
    transactionId: "TXN002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    customerPhone: "+1 (555) 234-5678",
    transactionType: "Refund",
    amount: 250,
    date: "2024-01-20",
    status: "Completed",
    paymentMethod: "PayPal",
    description: "Product return - defective item",
  },
  {
    id: 3,
    transactionId: "TXN003",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@email.com",
    customerPhone: "+1 (555) 345-6789",
    transactionType: "Purchase",
    amount: 3200,
    date: "2024-02-01",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    description: "Enterprise software license",
  },
  {
    id: 4,
    transactionId: "TXN004",
    customerName: "Sarah Williams",
    customerEmail: "sarah.williams@email.com",
    customerPhone: "+1 (555) 456-7890",
    transactionType: "Payment",
    amount: 850,
    date: "2024-02-10",
    status: "Completed",
    paymentMethod: "Debit Card",
    description: "Monthly service payment",
  },
  {
    id: 5,
    transactionId: "TXN005",
    customerName: "David Brown",
    customerEmail: "david.brown@email.com",
    customerPhone: "+1 (555) 567-8901",
    transactionType: "Purchase",
    amount: 4500,
    date: "2024-02-15",
    status: "Failed",
    paymentMethod: "Credit Card",
    description: "Bulk order - office supplies",
  },
  {
    id: 6,
    transactionId: "TXN006",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    customerPhone: "+1 (555) 678-9012",
    transactionType: "Subscription",
    amount: 99,
    date: "2024-03-01",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Annual membership renewal",
  },
  {
    id: 7,
    transactionId: "TXN007",
    customerName: "Chris Wilson",
    customerEmail: "chris.wilson@email.com",
    customerPhone: "+1 (555) 789-0123",
    transactionType: "Purchase",
    amount: 2100,
    date: "2024-03-05",
    status: "Completed",
    paymentMethod: "Apple Pay",
    description: "Hardware equipment purchase",
  },
  {
    id: 8,
    transactionId: "TXN008",
    customerName: "Lisa Martinez",
    customerEmail: "lisa.martinez@email.com",
    customerPhone: "+1 (555) 890-1234",
    transactionType: "Refund",
    amount: 450,
    date: "2024-03-15",
    status: "Pending",
    paymentMethod: "Credit Card",
    description: "Service cancellation refund",
  },
  {
    id: 9,
    transactionId: "TXN009",
    customerName: "Tom Anderson",
    customerEmail: "tom.anderson@email.com",
    customerPhone: "+1 (555) 901-2345",
    transactionType: "Payment",
    amount: 1800,
    date: "2024-03-20",
    status: "Completed",
    paymentMethod: "Wire Transfer",
    description: "Consulting services payment",
  },
  {
    id: 10,
    transactionId: "TXN010",
    customerName: "Rachel Taylor",
    customerEmail: "rachel.taylor@email.com",
    customerPhone: "+1 (555) 012-3456",
    transactionType: "Purchase",
    amount: 5200,
    date: "2024-04-01",
    status: "Completed",
    paymentMethod: "Credit Card",
    description: "Custom software development",
  },
];

export default function Transaction() {
  const [data] = useState(transactionData);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = data.filter(
    (transaction) =>
      transaction.customerName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTransaction(null);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="px-10 py-8 bg-[#fffffe] min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">
            Transaction Management
          </h1>
          <p className="text-[#2B7FFF] mt-2">
            Total Transactions:{" "}
            <span className="font-semibold text-lg">
              {filteredTransactions.length}
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
              borderRadius: "10px",
            },
            height: "40px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          placeholder="Search by Customer or ID"
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
                  Transaction ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Customer Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Type
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
                  Status
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
              {filteredTransactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell sx={{ textAlign: "center", fontWeight: 600 }}>
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {transaction.customerName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {transaction.transactionType}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#16a34a",
                      }}
                    >
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton
                        onClick={() => handleViewDetails(transaction)}
                        sx={{ color: "#2563eb" }}
                      >
                        <AiOutlineEye className="text-xl" />
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
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <TransactionDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        getStatusColor={getStatusColor}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
