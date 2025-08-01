import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./DashboardPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
const LOW_STOCK_THRESHOLD = 10;

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  stock: number;
}

const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(`${API_URL}/products`)
      .then((res) => setProducts(res.data));
  }, []);

  const count = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter(
    (p) => p.stock < LOW_STOCK_THRESHOLD
  );

  return (
    <Box className="dashboard-container">
      <Box className="cards-container">
        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5">Total Productos</Typography>
            <Typography variant="h2" color="primary">
              {count}
            </Typography>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5">Stock Total</Typography>
            <Typography variant="h2" color="secondary">
              {totalStock}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Productos con poco stock ({LOW_STOCK_THRESHOLD})
          </Typography>
          {lowStockProducts.length > 0 ? (
            <List>
              {lowStockProducts.map((p) => (
                <ListItem key={p.id}>
                  <ListItemText
                    primary={p.name}
                    secondary={`Stock: ${p.stock}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No hay productos con bajo stock.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
