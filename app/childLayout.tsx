"use client";

import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { SnackbarProvider } from "./(Components)/SnackBar/SnackBar";
import Navbar from "./(Components)/NavBar/NavBar";

// Define a Material UI theme (customizable)
const theme = createTheme({
  palette: {
    mode: "light", // Change to "dark" for dark mode
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#f0f0f",
    },
  },
});

interface ChildLayoutProps {
  children: ReactNode;
}

const ChildLayout = ({ children }: ChildLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Navbar />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          {" "}
          {children}
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default ChildLayout;
