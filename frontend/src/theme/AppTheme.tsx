import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface AppThemeProps {
  children: ReactNode; // Usa ReactNode como tipo para children
}

export const AppTheme = ({ children }: AppThemeProps) => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
