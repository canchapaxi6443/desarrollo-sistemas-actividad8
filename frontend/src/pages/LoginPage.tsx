// src/pages/LoginPage.tsx
import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

const LoginPage: React.FC = () => {
  const [userField, setUserField] = useState<string>("");
  const [passField, setPassField] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await axios.post(`${API_URL}/login`, {
        user: userField,
        pass: passField,
      });
      // Guarda usuario en contexto
      login(res.data.user);
      // Redirige al dashboard
      navigate("/manage/dashboard", { replace: true });
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={2}
    >
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box width="100%" maxWidth={360}>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <TextField
          label="Usuario"
          fullWidth
          value={userField}
          onChange={(e) => setUserField(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={passField}
          onChange={(e) => setPassField(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
