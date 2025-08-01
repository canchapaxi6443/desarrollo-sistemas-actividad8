import React from "react";
import { BrowserRouter as Router } from "react-router";
import { AppTheme } from "./theme/AppTheme";
import AppContent from "./AppContent";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppTheme>
        <AppContent />
      </AppTheme>
    </Router>
  </AuthProvider>
);

export default App;
