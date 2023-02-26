import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/Table2.css";
import Table2Dialog from "./Table2Dialog";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CreateCountry from "./CreateCountry";
import Swal from "sweetalert2";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { useState, useEffect } from "react";

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

const Table2 = ({ token }) => {
  const [countriesList, setCountriesList] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios
      .get("https://staging-blockchain-payment.livaat.com/api/countries")
      .then((res) => {
        setCountriesList(res.data.data);
        console.log(res);
      });
  }, []);
  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //   const axiosAuth = "Bearer " + tokens;
        //   axios.defaults.headers.common["Authorization"] = axiosAuth;
        //   axios
        //     .delete(``)
        //     .then((res) => {
        //       console.log(res);

        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
      }
    });
  }

  //pagination section

  const rowsPerPage = 10;
  const pagesVisited = pageNumber * rowsPerPage;
  const displayUsers = countriesList
    ?.slice(pagesVisited, pagesVisited + rowsPerPage)
    .map((row) => {
      return (
        <StyledTableRow key={row.id}>
          <StyledTableCell align="left">{row.id}</StyledTableCell>

          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="center">{row.phone_code}</StyledTableCell>
          <StyledTableCell align="left">{row.code}</StyledTableCell>
          <StyledTableCell align="right">
            <span className="countriesBtnContainer">
              <Button variant="outlined" className="countriesViewBtn">
                <RemoveRedEyeIcon />
              </Button>
              <Table2Dialog className="countriesEditBtn" />
              <Button
                variant="outlined"
                className="countriesDeleteBtn"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>
            </span>
          </StyledTableCell>
        </StyledTableRow>
      );
    });

  const pageCount = Math.ceil(countriesList?.length / rowsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "5rem" }}>Countries list</h3>
      <CreateCountry />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Country Name</StyledTableCell>
              <StyledTableCell align="right">phone_code</StyledTableCell>
              <StyledTableCell align="right">code</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayUsers}</TableBody>
        </Table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </TableContainer>
    </>
  );
};

export default Table2;
