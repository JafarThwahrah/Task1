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
import getCookie from "../../custom/GetCookie";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
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
        console.log(res);
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
              <StyledTableCell align="right">Row1</StyledTableCell>
              <StyledTableCell align="right">Row2</StyledTableCell>
              <StyledTableCell align="right">Row3</StyledTableCell>
              <StyledTableCell align="right">Row4</StyledTableCell>
              <StyledTableCell align="right">Row5</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList?.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.donate}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.management}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.nft_winner_shares}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.serene_winner_shares}
                </StyledTableCell>
                <StyledTableCell align="right">{row.fees}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.award_value}
                </StyledTableCell>
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
