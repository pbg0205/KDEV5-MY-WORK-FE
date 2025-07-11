// src/components/layout/Layout.styles.js
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

export const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: theme.palette.grey[100],
  position: "relative",
  overflow: "hidden",
}));

export const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  left: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "12px",
  width: 48,
  height: 48,
  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(34, 197, 94, 0.4)",
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    backgroundColor: "white",
    borderRight: "none",
    boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
  },
}));

export const Main = styled(Box)(({ theme }) => ({
  component: "main",
  position: "relative",
  flexGrow: 1,
  margin: theme.spacing(1),
  padding: 0,
  backgroundColor: theme.palette.background.default,
  overflow: "hidden",
  borderRadius: 16,
  boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.05)",
}));
