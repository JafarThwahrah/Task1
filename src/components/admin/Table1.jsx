import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/Table1.css";
import FormDialog from "./Table1Dialog";
import CreateAdmin from "./CreateAdmin";
import { useState, useEffect } from "react";
import axios from "axios";

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

const Table1 = ({ token }) => {
  const [adminList, setAdminList] = useState();
  useEffect(() => {
    const headers = { Authorization: `${token}` };
    axios
      .get("https://staging-blockchain-payment.livaat.com/api/admin/config", {
        headers,
      })
      .then((res) => {
        setAdminList(res.data.data);
      });
  }, []);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Admin list</h3>
      <CreateAdmin />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Donate</StyledTableCell>
              <StyledTableCell align="right">Management</StyledTableCell>
              <StyledTableCell align="right">nft_winner_shares</StyledTableCell>
              <StyledTableCell align="right">award_value</StyledTableCell>
              <StyledTableCell align="center">fees</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.donate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.management}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.nft_winner_shares}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.award_value}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fees}</StyledTableCell>
                <StyledTableCell align="right">
                  <FormDialog />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Table1;
