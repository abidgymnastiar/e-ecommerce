import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Styling for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Checkout Table Component
const CheckoutTable = () => {
  const [checkoutData, setCheckoutData] = useState([]);

  // Fetch checkout data from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3004/checkout") // Replace with your API endpoint
      .then((response) => {
        setCheckoutData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching checkout data:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Paket Produk</StyledTableCell>
            <StyledTableCell align="right">Harga</StyledTableCell>
            <StyledTableCell align="right">Timestamp</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkoutData.length > 0 ? (
            checkoutData.map((pkg) => (
              <StyledTableRow key={pkg.id}>
                <StyledTableCell component="th" scope="row">
                  {pkg.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  Rp.{pkg.price.toLocaleString("id-ID")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* Using Date.parse to validate and convert the timestamp */}
                  {isNaN(Date.parse(pkg.timestamp))
                    ? "Invalid Date"
                    : new Date(pkg.timestamp).toLocaleString("id-ID")}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                Data checkout tidak ditemukan.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckoutTable;
