// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    // 배경
    background: {
      default: "#fafafa", // 더 부드러운 배경
      paper: "#ffffff", // 카드, 콘텐츠 박스 배경
    },

    // 텍스트
    text: {
      primary: "#1a1a1a", // 본문 텍스트
      secondary: "#6b7280", // 명확한 서브 텍스트
      disabled: "#9ca3af", // 비활성 텍스트
    },

    // 무채색 계열
    grey: {
      900: "#111827",
      800: "#1f2937",
      700: "#374151",
      600: "#4b5563",
      500: "#6b7280",
      400: "#9ca3af",
      300: "#d1d5db",
      200: "#e5e7eb",
      100: "#f3f4f6",
      50: "#f9fafb",
    },

    // 포인트 컬러 - 연두색 계열
    primary: {
      main: "#22c55e", // 연두색
      light: "#4ade80",
      dark: "#16a34a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6b7280",
      light: "#9ca3af",
      dark: "#4b5563",
    },

    // 상태 컬러 (더 차분하게)
    status: {
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
        bg: "#fef2f2",
      },
      warning: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
        bg: "#fffbeb",
      },
      success: {
        main: "#22c55e", // 연두색으로 통일
        light: "#4ade80",
        dark: "#16a34a",
        bg: "#f0fdf4",
      },
      info: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
        bg: "#eff6ff",
      },
      neutral: {
        main: "#6b7280",
        light: "#9ca3af",
        dark: "#4b5563",
        bg: "#f9fafb",
      },
    },

    divider: "#e5e7eb", // 더 부드러운 구분선
  },

  typography: {
    fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,

    h1: { fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h2: { fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h3: { fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h4: { fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h5: { fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.025em" },
    h6: { fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.025em" },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.4 },
    button: { textTransform: "none", fontWeight: 500, letterSpacing: "0.025em" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          fontWeight: 500,
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#f0fdf4",
            color: "#22c55e",
            "&:hover": {
              backgroundColor: "#dcfce7",
            },
          },
        },
      },
    },
  },
});

export default theme;
