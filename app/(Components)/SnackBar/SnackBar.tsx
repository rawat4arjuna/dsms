"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

// Define the SnackbarContext Type
interface SnackbarContextType {
  showSnackbar: (message: string, severity?: "success" | "error" | "warning" | "info") => void;
}

// Create Context
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// Provider Props
interface SnackbarProviderProps {
  children: ReactNode;
}

// Snackbar Provider Component
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{ message: string; open: boolean; severity: "success" | "error" | "warning" | "info" }>({
    message: "",
    open: false,
    severity: "info",
  });

  // Function to show snackbar
  const showSnackbar = (message: string, severity: "success" | "error" | "warning" | "info" = "info") => {
    setSnackbar({ message, open: true, severity });
  };

  // Function to close snackbar
  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom Hook to use Snackbar Context
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
