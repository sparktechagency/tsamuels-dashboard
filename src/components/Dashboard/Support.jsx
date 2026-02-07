import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputAdornment,
  Modal,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import {
  useDeleteSupportDataMutation,
  useEditSupportDataMutation,
  useGetSupportDataQuery,
} from "../../Redux/slices/supportApi";
import dayjs from "dayjs";

export default function Support() {
  const [searchText, setSearchText] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const {
    data: supportData,
    isLoading: loadingSupportData,
    refetch,
  } = useGetSupportDataQuery();
  const supports = supportData?.data || [];
  // console.log("support data", supports);

  const [updateSupport, { isLoading: isUpdating }] =
    useEditSupportDataMutation();
  const [deleteSupport, { isLoading: isDeleting }] =
    useDeleteSupportDataMutation();

  // Update filtered emails when support data changes
  useEffect(() => {
    if (supports) {
      setFilteredEmails(supports);
    }
  }, [supports]);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchText(search);
    const filtered = supports.filter(
      (email) =>
        email.name?.toLowerCase().includes(search.toLowerCase()) ||
        email.email?.includes(search),
    );
    setFilteredEmails(filtered);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (email) => {
    setSelectedEmail(email);
    setReplyText("");
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailsModal(false);
    setSelectedEmail(null);
    setReplyText("");
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please type a reply before sending.");
      return;
    }

    try {
      // Update support status to "Solved" and add reply
      const response = await updateSupport({
        id: selectedEmail._id || selectedEmail.id,
        data: {
          status: "Solved",
          reply: replyText,
        },
      }).unwrap();
      // console.log(response);

      if (response.success) {
        toast.success("Reply sent successfully!");
        setReplyText("");
        handleCloseModal();
        refetch(); // Refresh the data
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error(
        error?.data?.message || "Failed to send reply. Please try again.",
      );
    }
  };

  const handleDeleteClick = (email) => {
    setDeleteId(email._id || email.id);
    setSelectedEmail(email);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
    setSelectedEmail(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSupport(deleteId).unwrap();
      // console.log(response);
      if (response.success) {
        toast.success("Support request deleted successfully!");
        handleCloseDeleteDialog();
        refetch(); // Refresh the data
      }
    } catch (error) {
      console.error("Error deleting support:", error);
      toast.error(error?.data?.message || "Failed to delete support request.");
    }
  };

  if (loadingSupportData) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="px-10 py-8 h-[92vh]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Support Emails</h1>
          <p className="text-[#2B7FFF] mt-1">Check the support messages</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
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
            placeholder="Search by User Name or Email"
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
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(90deg, #00D3F2 0%, #2B7FFF 100%)",
              }}
            >
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                User Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Problem Description
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
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmails
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((email) => (
                <TableRow key={email._id || email.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {email.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {email.email}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", maxWidth: 200 }}>
                    {email.message?.length > 50
                      ? `${email.message.substring(0, 50)}...`
                      : email.message}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "10px 12px",
                        borderRadius: "12px",
                        color: "white",
                        backgroundColor:
                          email.status?.toLowerCase() === "solved"
                            ? "#1EC74F"
                            : "#EE5252",
                        fontWeight: "600",
                      }}
                    >
                      {email.status.charAt(0).toUpperCase() +
                        email.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <div className="flex justify-center gap-2">
                      <IconButton onClick={() => handleOpenModal(email)}>
                        <FiEye className="text-lg text-[#131927]" />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(email)}>
                        <FiTrash2 className="text-lg text-red-600" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal to display email details */}
      <Modal
        open={openDetailsModal}
        onClose={handleCloseModal}
        aria-labelledby="email-details-modal"
        aria-describedby="modal-to-view-email-details"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
            backgroundColor: "#FDFDFD",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {selectedEmail && (
            <div className="flex flex-col items-center gap-5">
              <p className="text-center text-3xl font-semibold text-[#1A1A1A] py-5">
                Support Request Details
              </p>
              <div className="flex flex-col gap-5 w-full px-10">
                <div className="flex justify-between w-full gap-10">
                  <div>
                    <p className="font-semibold">From:</p>
                    <p>{selectedEmail.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{selectedEmail.email}</p>
                  </div>
                  {selectedEmail.createdAt && (
                    <div>
                      <p className="font-semibold">Date:</p>
                      <p>
                        {dayjs(selectedEmail.createdAt).format(
                          "DD MMM YYYY, HH:mm",
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">Message:</p>
                  <p className="text-justify">{selectedEmail.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Your Reply</p>
                  <TextField
                    className="w-full"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#131927",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "12px",
                      },
                      "& .MuiInputBase-root": {
                        height: "100%",
                      },
                      backgroundColor: "#F5F5F5",
                      "& .MuiInputBase-input": {
                        padding: "8px",
                      },
                    }}
                    multiline
                    rows={4}
                    placeholder="Type your reply here..."
                  />
                  <div className="flex justify-end gap-4 mt-5">
                    <Button
                      onClick={handleCloseModal}
                      disabled={isUpdating}
                      sx={{
                        backgroundColor: "#FA4747",
                        textTransform: "none",
                        width: "100px",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#EE5252",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#2B7FFF",
                        textTransform: "none",
                        width: "100px",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1a5fd9",
                        },
                      }}
                      onClick={handleSendReply}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Support Request</DialogTitle>
        <DialogContent>
          <p className="text-gray-700">
            Are you sure you want to delete this support request? This action
            cannot be undone.
          </p>
          {selectedEmail && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-sm text-gray-800 mb-1">
                From: {selectedEmail.name}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                Email: {selectedEmail.email}
              </p>
              <p className="text-xs text-gray-600">
                {selectedEmail.message?.substring(0, 100)}
                {selectedEmail.message?.length > 100 ? "..." : ""}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            disabled={isDeleting}
            sx={{
              color: "#666",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            disabled={isDeleting}
            sx={{
              bgcolor: "#dc2626",
              "&:hover": { bgcolor: "#b91c1c" },
              textTransform: "none",
            }}
          >
            {isDeleting ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
