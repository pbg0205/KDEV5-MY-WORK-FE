import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import {
  SidebarRoot,
  ProfileSection,
  NavList,
  NavItem,
} from "./Sidebar.styles";
import navItems from "@/constants/navItems";
import { getRoleLabel } from "@/utils/roleUtils";
import {
  logout as logoutThunk,
  clearAuthState,
} from "@/features/auth/authSlice";

export default function Sidebar({
  onClose,
  onNotificationsClick,
  unreadCount,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberName = useSelector((state) => state.auth.user?.name);
  const memberRole = useSelector((state) => state.auth.user?.role);
  const logoImagePath = useSelector((state) => state.auth.company?.logoImagePath);
  const currentPath = location.pathname;

  const filteredNavItems = navItems.filter(
    (item) => item.roles && item.roles.includes(memberRole)
  );

  const handleItemClick = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      dispatch(clearAuthState());
      onClose();
      navigate("/login");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <SidebarRoot>
      <ProfileSection>
        <Avatar 
          src={logoImagePath || "/toss_logo.png"} 
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <div className="profile-text" style={{ marginLeft: 8 }}>
            <Typography variant="body2" className="profile-role">
              {getRoleLabel(memberRole) || ""}
            </Typography>
            <Typography variant="subtitle1" className="profile-name">
              {memberName || ""}
            </Typography>
          </div>
          <IconButton 
            size="small" 
            onClick={onNotificationsClick}
            sx={{
              backgroundColor: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.text.secondary,
              borderRadius: 1.5,
              width: 32,
              height: 32,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: (theme) => `${theme.palette.primary.main}10`,
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            <Badge
              badgeContent={unreadCount > 0 ? unreadCount : null}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.65rem",
                  minWidth: "14px",
                  height: "14px",
                  borderRadius: "7px",
                },
              }}
            >
              <NotificationsRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Box>
      </ProfileSection>

      <NavList>
        <Box>
          {filteredNavItems.map(({ text, icon: Icon, path, children }) => (
            <Box key={text} sx={{ mb: 1.5 }}>
              {/* 상위 메뉴 */}
              {!children && (
                <NavItem disablePadding onClick={() => handleItemClick(path)}>
                  <ListItemButton
                    selected={currentPath === path}
                    sx={{ borderRadius: 1, px: 1, py: 0.8 }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        noWrap: true,
                        sx: { fontSize: 14 },
                      }}
                    />
                  </ListItemButton>
                </NavItem>
              )}

              {/* 하위 메뉴 */}
              {children && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      pl: 1,
                      color: "text.secondary",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      opacity: 0.8,
                    }}
                  >
                    {text}
                  </Typography>

                  {children.map(
                    ({ text: childText, icon: ChildIcon, path: childPath }) => (
                      <NavItem
                        key={childText}
                        disablePadding
                        onClick={() => handleItemClick(childPath)}
                        sx={{ pl: 2 }}
                      >
                        <ListItemButton
                          selected={currentPath === childPath}
                          sx={{ borderRadius: 1, px: 1.5, py: 0.8 }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <ChildIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={childText}
                            primaryTypographyProps={{
                              noWrap: true,
                              sx: { fontSize: 14 },
                            }}
                          />
                        </ListItemButton>
                      </NavItem>
                    )
                  )}
                </>
              )}
            </Box>
          ))}
        </Box>
      </NavList>

      {/* 로그아웃 버튼 */}
      <Box 
        sx={{ 
          mt: "auto",
          pt: 1.5,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <NavItem onClick={handleLogout} disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              padding: 1.5,
              color: (theme) => theme.palette.text.secondary,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: (theme) => `${theme.palette.error.main}08`,
                color: (theme) => theme.palette.error.main,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="로그아웃"
              primaryTypographyProps={{ 
                color: "inherit",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            />
          </ListItemButton>
        </NavItem>
      </Box>
    </SidebarRoot>
  );
}
