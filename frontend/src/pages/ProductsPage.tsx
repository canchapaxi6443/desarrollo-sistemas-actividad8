import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  stock: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get<Product[]>(`${API_URL}/products`)
      .then((res) => setProducts(res.data));
  };

  useEffect(fetchProducts, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    axios.delete(`${API_URL}/products/${id}`).then(fetchProducts);
  };

  return (
    <Box px={{ xs: 1, sm: 2 }} py={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        flexWrap="wrap"
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Productos ({products.length})
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/manage/products/new")}
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          Nuevo
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.price.toFixed(2)}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>
                <TableCell align="right">{p.stock}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/manage/products/${p.id}`)}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(p.id)}>
                    <Delete fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsPage;
