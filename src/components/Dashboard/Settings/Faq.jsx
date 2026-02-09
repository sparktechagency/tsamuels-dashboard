"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useGetFAQsQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} from "../../../Redux/slices/settingsApi";
import { toast } from "sonner";

const FAQ = () => {
  const { data: faqData, isLoading: loadingFaqs, isError } = useGetFAQsQuery();
  const [addFaq, { isLoading: isAdding }] = useAddFaqMutation();
  const [editFaq, { isLoading: isEditing }] = useEditFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const faqs = faqData?.data;

  const [expanded, setExpanded] = useState("panel1");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("add"); // 'add' or 'edit'
  const [currentFaq, setCurrentFaq] = useState({ question: "", answer: "" });
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [deletingFaq, setDeletingFaq] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Open dialog for adding new FAQ
  const handleAddClick = () => {
    setDialogMode("add");
    setCurrentFaq({ question: "", answer: "" });
    setOpenDialog(true);
  };

  // Open dialog for editing existing FAQ
  const handleEditClick = (faq) => {
    setDialogMode("edit");
    setCurrentFaq({ question: faq.question, answer: faq.answer });
    setEditingFaqId(faq._id);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentFaq({ question: "", answer: "" });
    setEditingFaqId(null);
  };

  // Save FAQ (add or edit)
  const handleSaveFaq = async () => {
    try {
      if (dialogMode === "add") {
        const response = await addFaq(currentFaq).unwrap();
        console.log("add faq response", response);
        if (response.success) {
          toast.success("FAQ added successfully!");
        }
      } else {
        const response = await editFaq({
          id: editingFaqId,
          data: currentFaq,
        }).unwrap();
        console.log("edit faq response", response);
        if (response.success) {
          toast.success("FAQ updated successfully!");
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast.error(
        error?.data?.message || "Failed to save FAQ. Please try again.",
      );
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (faq) => {
    setDeletingFaq(faq);
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingFaq(null);
  };

  // Confirm delete FAQ
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteFaq(deletingFaq._id).unwrap();
      console.log("delete faq response", response);
      if (response.success) {
        toast.success("FAQ deleted successfully!");
      }
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error(
        error?.data?.message || "Failed to delete FAQ. Please try again.",
      );
    }
  };

  if (loadingFaqs || isAdding || isEditing || isDeleting) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white">
        Error loading FAQ data. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white px-[5%] py-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <p className="text-lg sm:text-3xl lg:text-4xl text-black font-semibold">
          Frequently Asked Questions
        </p>
        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{
            bgcolor: "#2B7FFF",
            "&:hover": { bgcolor: "#1a5fd9" },
            textTransform: "none",
            px: 3,
          }}
        >
          Add FAQ
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqs &&
          faqs.map((faq, index) => (
            <div key={index} className="mb-2 relative">
              <Accordion
                expanded={expanded === faq.question}
                onChange={handleChange(faq.question)}
                sx={{
                  bgcolor: "#fff",
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  borderRadius: "15px",
                }}
              >
                <AccordionSummary
                  expandIcon={<IoIosArrowDown className="text-lg text-white" />}
                  aria-controls={`${faq.question}-content`}
                  id={`${faq.question}-header`}
                  sx={{
                    color: expanded === faq.question ? "white" : "black",
                    fontSize: {
                      xs: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    fontWeight: "500",
                    px: 2,
                    borderRadius: expanded === faq.question ? "15px" : "10px",
                    background:
                      expanded === faq.question ? "#2B7FFF" : "#00D3F2",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <div className="flex justify-between items-center w-full pr-2">
                    <p>{faq.question}</p>
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(faq)}
                        sx={{ color: "white" }}
                      >
                        <FiEdit2 className="text-sm" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(faq)}
                        sx={{ color: "white" }}
                      >
                        <FiTrash2 className="text-sm" />
                      </IconButton>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "#2B7FFF",
                    color: "#fff",
                    px: 2,
                    fontSize: {
                      xs: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    borderRadius: "10px 10px 15px 15px",
                  }}
                >
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === "add" ? "Add New FAQ" : "Edit FAQ"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            variant="outlined"
            value={currentFaq.question}
            onChange={(e) =>
              setCurrentFaq({ ...currentFaq, question: e.target.value })
            }
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Answer"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={currentFaq.answer}
            onChange={(e) =>
              setCurrentFaq({ ...currentFaq, answer: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#666",
              bgcolor: "#ccc",
              "&:hover": { bgcolor: "#999", color: "white" },
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveFaq}
            variant="contained"
            sx={{
              bgcolor: "#2B7FFF",
              "&:hover": { bgcolor: "#1a5fd9" },
              textTransform: "none",
            }}
            disabled={!currentFaq.question.trim() || !currentFaq.answer.trim()}
          >
            {dialogMode === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>Delete FAQ</DialogTitle>
        <DialogContent>
          <p className="text-gray-700">
            Are you sure you want to delete this FAQ? This action cannot be
            undone.
          </p>
          {deletingFaq && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-sm text-gray-800 mb-1">
                {deletingFaq.question}
              </p>
              <p className="text-xs text-gray-600">{deletingFaq.answer}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              color: "#666",
              bgcolor: "#ccc",
              "&:hover": { bgcolor: "#999", color: "white" },
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              bgcolor: "#dc2626",
              "&:hover": { bgcolor: "#b91c1c" },
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FAQ;
