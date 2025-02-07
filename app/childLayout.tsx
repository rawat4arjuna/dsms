"use client";

import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";

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
      <Container maxWidth="md">{children}</Container>
    </ThemeProvider>
  );
};

export default ChildLayout;
