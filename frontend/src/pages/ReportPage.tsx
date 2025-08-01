import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

interface ReportItem {
  id: number;
  name: string;
  stock: number;
  total_value: number;
}

const ReportPage: React.FC = () => {
  const [report, setReport] = useState<ReportItem[]>([]);

  useEffect(() => {
    axios
      .get<ReportItem[]>(`${API_URL}/report`)
      .then((res) => setReport(res.data));
  }, []);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "report.json");
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(report);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    const buf = XLSX.write(wb, { bookType: "csv", type: "array" });
    saveAs(new Blob([buf], { type: "text/csv" }), "report.csv");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(report);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      "report.xlsx"
    );
  };

  const exportPDF = async () => {
    const tableElement = document.getElementById("report-table");
    if (!tableElement) return;
    try {
      const canvas = await html2canvas(tableElement as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    } catch (err) {
      console.error("Error exportando PDF:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reporte de Inventario
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={exportJSON}>
          Exportar JSON
        </Button>
        <Button variant="contained" onClick={exportCSV}>
          Exportar CSV
        </Button>
        <Button variant="contained" onClick={exportExcel}>
          Exportar Excel
        </Button>
        <Button variant="contained" onClick={exportPDF}>
          Exportar PDF
        </Button>
      </Stack>
      <Table id="report-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("es-EC", {
                  style: "currency",
                  currency: "USD",
                }).format(item.total_value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ReportPage;
