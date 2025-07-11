// src/components/layout/Sidebar.styles.js
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const SidebarRoot = styled(Box)(({ theme }) => ({
  width: 280,
  minWidth: 280,
  height: "100vh",
  backgroundColor: "white",
  borderRight: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  overflow: "hidden",
}));

export const ProfileSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiAvatar-root": {
    width: 40,
    height: 40,
    border: `2px solid white`,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  "& .profile-text": {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.3,
    flex: 1,
    minWidth: 0,
  },
  "& .profile-role": {
    fontSize: "0.75rem",
    color: theme.palette.primary.main,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  "& .profile-name": {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: theme.palette.text.primary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

export const NavList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  "& > *": {
    marginBottom: theme.spacing(0.5),
  },
}));

export const NavItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(0.5),
  "& .MuiListItemButton-root": {
    color: theme.palette.text.primary,
    borderRadius: 8,
    padding: theme.spacing(1.2, 1.5),
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}08`,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 36,
    color: "inherit",
    "& .MuiSvgIcon-root": {
      fontSize: "1.125rem",
    },
  },
  "& .MuiListItemText-root": {
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  opacity: 0.8,
}));
