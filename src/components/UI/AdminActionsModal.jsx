import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { FaTimes } from "react-icons/fa";

export default function AdminActionsModal({
  isModalOpen,
  closeModal,
  modalStyle,
  selectedRecord,
  handleImpersonate,
  handleForcePasswordReset,
  handleRevokeSessions,
  handleBlockUser,
  handleTransferOwnership,
  handleDeleteFamily,
  actionInputs,
  setActionInputs,
}) {
  console.log(selectedRecord);
  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box sx={modalStyle}>
        {/* Modal Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
            color: "white",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
            {selectedRecord?.role === "USER"
              ? "👤 User Admin Controls"
              : "👨‍👩‍👧‍👦 Family Admin Controls"}
          </p>
          <IconButton onClick={closeModal} size="small" sx={{ color: "white" }}>
            <FaTimes size={20} />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px" }}>
          {selectedRecord && (
            <>
              {/* Details Section */}
              <div
                style={{
                  marginBottom: "24px",
                  padding: "16px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    color: "#1e40af",
                  }}
                >
                  {selectedRecord.role === "USER"
                    ? "📋 User Details"
                    : "📋 Family Details"}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                  }}
                >
                  {selectedRecord.role === "USER" ? (
                    <>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          User ID
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "monospace",
                            fontWeight: 600,
                          }}
                        >
                          {selectedRecord._id}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Name
                        </p>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          {selectedRecord.name}
                        </p>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Email
                        </p>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          {selectedRecord.email}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Plan
                        </p>
                        <Chip
                          label={selectedRecord.plan}
                          size="small"
                          color={
                            selectedRecord.plan === "Premium"
                              ? "primary"
                              : "default"
                          }
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Status
                        </p>
                        <Chip
                          label={selectedRecord.status}
                          size="small"
                          color={
                            selectedRecord.status === "active"
                              ? "success"
                              : selectedRecord.status === "blocked"
                                ? "error"
                                : "default"
                          }
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Family ID
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                          }}
                        >
                          {selectedRecord.familyId || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Active Sessions
                        </p>
                        <p style={{ margin: 0 }}>
                          {selectedRecord.onlineStatus.lastSeen
                            ? dayjs(
                                selectedRecord.onlineStatus.lastSeen,
                              ).format("MMM D, YYYY")
                            : "N/A"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          ID
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "monospace",
                            fontWeight: 600,
                          }}
                        >
                          {selectedRecord._id}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Family Name
                        </p>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          {selectedRecord.familyName}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Plan
                        </p>
                        <Chip
                          label={selectedRecord.subscriptionPlan}
                          size="small"
                          color="primary"
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Status
                        </p>
                        <Chip
                          label={selectedRecord.status}
                          size="small"
                          color={
                            selectedRecord.status === "active"
                              ? "success"
                              : "default"
                          }
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Members
                        </p>
                        <p style={{ margin: 0 }}>
                          {selectedRecord.members} members
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Events
                        </p>
                        <p style={{ margin: 0 }}>
                          {selectedRecord.totalEvents} events
                        </p>
                      </div>{" "}
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Special Events
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                          }}
                        >
                          {selectedRecord.specialEvents}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              {/* Actions Section */}
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "20px",
                    color: "#1e293b",
                  }}
                >
                  🛠️ Admin Actions
                </p>

                {selectedRecord.role === "USER" ? (
                  <>
                    {/* User Security Actions */}
                    <div style={{ marginBottom: "24px" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#64748b",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        🔒 Security Actions
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "12px",
                        }}
                      >
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleImpersonate}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.5,
                            borderColor: "#3b82f6",
                            color: "#3b82f6",
                            "&:hover": {
                              borderColor: "#2563eb",
                              bgcolor: "#eff6ff",
                            },
                          }}
                        >
                          👁️ Impersonate (Read-Only)
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleForcePasswordReset}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.5,
                            borderColor: "#f59e0b",
                            color: "#f59e0b",
                            "&:hover": {
                              borderColor: "#d97706",
                              bgcolor: "#fef3c7",
                            },
                          }}
                        >
                          🔑 Force Password Reset
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleRevokeSessions}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.5,
                            borderColor: "#f59e0b",
                            color: "#f59e0b",
                            "&:hover": {
                              borderColor: "#d97706",
                              bgcolor: "#fef3c7",
                            },
                          }}
                        >
                          🚫 Revoke Sessions
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleBlockUser}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.5,
                            borderColor:
                              selectedRecord.status === "blocked"
                                ? "#10b981"
                                : "#ef4444",
                            color:
                              selectedRecord.status === "blocked"
                                ? "#10b981"
                                : "#ef4444",
                            "&:hover": {
                              borderColor:
                                selectedRecord.status === "blocked"
                                  ? "#059669"
                                  : "#dc2626",
                              bgcolor:
                                selectedRecord.status === "blocked"
                                  ? "#ecfdf5"
                                  : "#fee2e2",
                            },
                          }}
                        >
                          {selectedRecord.status === "blocked"
                            ? "✅ Unblock User"
                            : "⛔ Block User"}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Family Management Actions */}
                    <div style={{ marginBottom: "24px" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#64748b",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        👨‍👩‍👧‍👦 Family Management
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "8px" }}>
                          <TextField
                            size="small"
                            label="New Owner User ID"
                            value={actionInputs.targetId}
                            onChange={(e) =>
                              setActionInputs({
                                ...actionInputs,
                                targetId: e.target.value,
                              })
                            }
                            sx={{ flex: 1 }}
                          />
                          <Button
                            variant="contained"
                            onClick={handleTransferOwnership}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              bgcolor: "#3b82f6",
                              "&:hover": { bgcolor: "#2563eb" },
                            }}
                          >
                            🔄 Transfer Ownership
                          </Button>
                        </div>

                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleDeleteFamily}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            py: 1.5,
                            borderColor: "#ef4444",
                            color: "#ef4444",
                            "&:hover": {
                              borderColor: "#dc2626",
                              bgcolor: "#fee2e2",
                            },
                          }}
                        >
                          🗑️ Delete Family
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "flex-end",
            background: "#f8fafc",
          }}
        >
          <Button
            onClick={closeModal}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
