import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SectionBox({
  icon,
  title,
  children,
  iconColor = "primary.main",
  height = 300,
}) {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        height,
        overflow: "hidden",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {/* 헤더 영역 */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.grey[50],
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* 아이콘 */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
            }}
          >
            {icon}
          </Box>
          
          {/* 타이틀 */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 600,
                color: "text.primary",
                fontSize: "1rem",
                lineHeight: 1.4,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      {/* 컨텐츠 영역 */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
