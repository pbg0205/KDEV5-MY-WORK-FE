// components/RowItem.jsx
import React from "react";
import { Box, Chip, Stack, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTimeRounded";

export default function RowItem({ name, endAt, dday, id }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const getColorKey = (dday) => {
    if (dday <= 1) return "error";
    if (dday <= 3) return "warning";
    return "neutral"; // success 대신 neutral로 변경
  };

  const colorKey = getColorKey(dday);
  const statusColor = theme.palette.status[colorKey];

  return (
    <Paper
      onClick={() => navigate(`/projects/${id}/posts`)}
      elevation={0}
      sx={{
        p: 2.5,
        mb: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: colorKey === "neutral" ? "background.paper" : statusColor.bg,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="subtitle2" 
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "0.9rem",
              lineHeight: 1.4,
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <AccessTimeIcon 
              sx={{ 
                fontSize: 14, 
                color: "text.secondary",
              }} 
            />
            <Typography 
              variant="caption" 
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {dayjs(endAt).format("MM월 DD일 마감")}
            </Typography>
          </Stack>
        </Box>
        
        <Chip
          label={`D-${dday}`}
          size="small"
          sx={{
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: "0.75rem",
            backgroundColor: colorKey === "neutral" ? theme.palette.grey[600] : statusColor.main,
            color: "white",
            border: "none",
            minWidth: 50,
            height: 24,
          }}
        />
      </Stack>
    </Paper>
  );
}
