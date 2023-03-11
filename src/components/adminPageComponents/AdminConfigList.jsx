import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/AdminConfigList.css";
import FormDialog from "./EditAdminConfig";
import CreateAdmin from "./CreateAdminConfig";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
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

const AdminConfigList = ({ token }) => {
  const [adminList, setAdminList] = useState();
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `${token}` };
    axios
      .get("https://staging-blockchain-payment.livaat.com/api/admin/config", {
        headers,
      })
      .then((res) => {
        setAdminList([res.data.data]);
        setIsLoading(false);
      });
  }, [isEdited, token]);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Admin list</h3>
      <CreateAdmin />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center"> Donate</StyledTableCell>
              <StyledTableCell align="right">Management</StyledTableCell>
              <StyledTableCell align="right">Nft winner shares</StyledTableCell>
              <StyledTableCell align="right">Award value</StyledTableCell>
              <StyledTableCell align="center">Convert fee</StyledTableCell>
              <StyledTableCell align="center">Cashout fee</StyledTableCell>
              <StyledTableCell align="center">Enable transfer</StyledTableCell>
              <StyledTableCell align="center">
                Max Quantity buy nft
              </StyledTableCell>
              <StyledTableCell align="center">
                Min coins buy amount
              </StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              adminList?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell scope="row">{row.donate}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.management}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.nft_winner_shares}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.award_value}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.convert_fee}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.cashout_fee}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.enable_transfer}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.max_qty_buy_nft}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.min_coins_buy_amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <FormDialog
                      setIsEdited={setIsEdited}
                      isEdited={isEdited}
                      id={row.id}
                      cashout_fee={row.cashout_fee}
                      convert_fee={row.convert_fee}
                      enable_transfer={row.enable_transfer}
                      max_qty_buy_nft={row.max_qty_buy_nft}
                      min_coins_buy_amount={row.min_coins_buy_amount}
                      donate={row.donate}
                      management={row.management}
                      nft_winner_shares={row.nft_winner_shares}
                      award_value={row.award_value}
                      months_of_declare_shares={row.months_of_declare_shares}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="CircularAdminConfigList">
            <CircularProgress />
          </div>
        )}
      </TableContainer>
    </>
  );
};

export default AdminConfigList;
