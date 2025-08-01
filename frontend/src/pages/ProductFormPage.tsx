import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

interface FormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  stock: number;
}

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    stock: 0,
  });

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/products/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (id) await axios.put(`${API_URL}/products/${id}`, form);
      else await axios.post(`${API_URL}/products`, form);
      navigate("/manage/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={2} p={2}>
      <TextField
        name="name"
        label="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Descripción"
        value={form.description}
        onChange={handleChange}
      />
      <TextField
        name="price"
        label="Precio"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
      />
      <TextField
        name="quantity"
        label="Cantidad"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <TextField
        name="stock"
        label="Stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <Box>
        <Button variant="contained" onClick={handleSubmit}>
          {id ? "Actualizar" : "Crear"}
        </Button>
        <Button sx={{ ml: 1 }} onClick={() => navigate("/manage/products")}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default ProductFormPage;
