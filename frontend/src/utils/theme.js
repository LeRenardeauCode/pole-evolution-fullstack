import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF1966",
      light: "#FF4D8A",
      dark: "#D41173",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D41173",
      light: "#E94D9B",
      dark: "#A00D5A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAF9F9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#141414",
      secondary: "#666666",
      disabled: "#AAAAAA",
    },
    navy: {
      main: "#100249",
      light: "#2A1A6D",
      dark: "#0A0130",
    },

    gradient: {
      page1:
        "linear-gradient(180deg, #574A78 0%, #870E58 46%, #FF1966 50%, #870E58 52%, #870E58 100%)",

      page2:
        "radial-gradient(circle, #C3135F 0%, #FF1966 0%, #870E58 0%, #4C0850 69%, #574A78 100%)",

      page3:
        "linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)",

      primary: "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
      secondary: "linear-gradient(135deg, #100249 0%, #D41173 100%)",
      avatar: "linear-gradient(180deg, #100249 0%, #FF1966 100%)",
    },

    success: {
      main: "#4CAF50",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#FF9800",
    },
    info: {
      main: "#2196F3",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h0: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "70px",
      fontWeight: 700,
      lineHeight: 1.1,
      "@media (max-width:900px)": {
        fontSize: "36px",
      },
    },

    titre: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:900px)": {
        fontSize: "28px",
      },
    },

    h1: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "40px",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:900px)": {
        fontSize: "24px",
      },
    },

    h2: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "36px",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:900px)": {
        fontSize: "20px",
      },
    },

    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:900px)": {
        fontSize: "18px",
      },
    },

    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: 1.4,
      "@media (max-width:900px)": {
        fontSize: "16px",
      },
    },

    h3: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:900px)": {
        fontSize: "18px",
      },
    },
    h4: {
      fontFamily: '"Manrope", sans-serif',
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.4,
      "@media (max-width:900px)": {
        fontSize: "16px",
      },
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
    },

    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
    },

    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
      "@media (max-width:900px)": {
        fontSize: "12px",
      },
    },

    button: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "16px",
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.5px",
    },

    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.4,
    },

    overline: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  spacing: 8,

  shape: {
    borderRadius: 8,
  },

  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.1)",
    "0px 4px 8px rgba(0, 0, 0, 0.1)",
    "0px 8px 16px rgba(0, 0, 0, 0.1)",
    "0px 12px 24px rgba(0, 0, 0, 0.15)",
    "0px 16px 32px rgba(0, 0, 0, 0.2)",
    "0px 20px 40px rgba(0, 0, 0, 0.25)",
    "0px 24px 48px rgba(0, 0, 0, 0.3)",
    ...Array(17).fill("0px 24px 48px rgba(0, 0, 0, 0.3)"),
  ],

  components: {
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
      },
    },

    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },

    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FAF9F9",
          margin: 0,
          padding: 0,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.3s ease",
          fontFamily: '"Inter", sans-serif',
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
        contained: {
          backgroundColor: "#100249",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#D41173", 
          },
        },
        outlined: {
          borderColor: "white",
          color: "white",
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            borderColor: "#D41173",
            backgroundColor: "rgba(212, 17, 115, 0.1)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "none",
            boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontFamily: '"Inter", sans-serif',
            "& fieldset": {
              borderColor: "#E0E0E0",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#FF1966",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF1966",
            },
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#D41173",
          "&.Mui-checked": {
            color: "#FF1966",
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#D41173",
          "&.Mui-checked": {
            color: "#FF1966",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #100249 0%, #FF1966 100%)",
          color: "#FFFFFF",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 500,
          fontFamily: '"Inter", sans-serif',
        },
        filled: {
          background: "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
          color: "#FFFFFF",
        },
        outlined: {
          borderColor: "#FF1966",
          color: "#FF1966",
          borderWidth: "2px",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#141414",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#4CAF50",
        },
        filledError: {
          backgroundColor: "#F44336",
        },
        filledInfo: {
          backgroundColor: "#2196F3",
        },
        filledWarning: {
          backgroundColor: "#FF9800",
        },
        outlinedSuccess: {
          borderColor: "#4CAF50",
          color: "#4CAF50",
          borderWidth: "2px",
        },
        outlinedError: {
          borderColor: "#F44336",
          color: "#F44336",
          borderWidth: "2px",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#100249",
          color: "#FFFFFF",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "8px 12px",
          fontFamily: '"Inter", sans-serif',
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h0: 'h1',
          titre: 'h2',
        },
      },
    },
  },
});

export default theme;
