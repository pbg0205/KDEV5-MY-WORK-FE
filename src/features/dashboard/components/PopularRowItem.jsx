// components/PopularRowItem.jsx
import React from "react";
import { Box, Stack, Typography, Paper, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUpRounded";

export default function PopularRowItem({ rank, title, id }) {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return theme.palette.status.success.main; // 연두색
      case 2:
        return theme.palette.status.neutral.main; // 회색
      case 3:
        return theme.palette.status.neutral.dark; // 진한 회색
      default:
        return theme.palette.status.neutral.light; // 연한 회색
    }
  };

  const rankColor = getRankColor(rank);

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
        backgroundColor: "background.paper",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* 순위 */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: rankColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "0.875rem",
            flexShrink: 0,
          }}
        >
          {rank}
        </Box>
        
        {/* 프로젝트 정보 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography 
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "0.9rem",
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TrendingUpIcon 
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
              활발한 활동
            </Typography>
          </Stack>
        </Box>
        
        {/* 순위 표시 */}
        <Chip
          label={`${rank}위`}
          size="small"
          sx={{
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 600,
            backgroundColor: `${rankColor}15`,
            color: rankColor,
            border: `1px solid ${rankColor}30`,
            borderRadius: 1.5,
          }}
        />
      </Stack>
    </Paper>
  );
}
