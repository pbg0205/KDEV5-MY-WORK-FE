// components/InfoCard.jsx
import React from "react";
import { Box, Paper, Stack, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function InfoCard({ icon, label, value, color }) {
  const theme = useTheme();
  const statusColor = theme.palette.status[color];

  // 아이콘 색상을 더 차분하게 조정
  const getIconColor = (color) => {
    switch (color) {
      case "success":
        return theme.palette.primary.main; // 연두색
      default:
        return theme.palette.grey[600]; // 차분한 회색
    }
  };

  const iconColor = getIconColor(color);

  return (
    <Paper
      elevation={1}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 2,
        backgroundColor: statusColor?.bg,
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* 아이콘 영역 */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      
      {/* 텍스트 영역 */}
      <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="body2" 
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 700,
            fontSize: "1.75rem",
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {value?.toLocaleString() || 0}
        </Typography>
      </Stack>
    </Paper>
  );
}
