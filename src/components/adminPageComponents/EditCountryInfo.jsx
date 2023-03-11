import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { validate } from "../../customHooks/CountriesValidation";
import axios from "axios";
import Swal from "sweetalert2";

export default function Table2Dialog(props) {
  const [open, setOpen] = React.useState(false);
  const [textFieldValue, setTextFieldValue] = useState({
    id: props.id,
    name: props.name,
    code: props.code,
    phone_code: props.phone_code,
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const headers = { authorization: props.token };
      axios
        .post(
          "https://staging-blockchain-payment.livaat.com/api/countries/update",
          textFieldValue,
          { headers: headers }
        )
        .then((res) => {
          setOpen(false);
          Swal.fire(
            "Success!",
            "Country Information updated Successfully.",
            "success"
          );
          props.setIsEdited(!props.isEdited);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors, isSubmit, textFieldValue, props]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setTextFieldValue({ ...textFieldValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(textFieldValue));
    setIsSubmit(true);
  };
  return (
    <div>
      <Button
        variant="outlined"
        className="countriesEditBtn"
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialogTitle">
          Update Country Information
        </DialogTitle>
        <DialogContent className="dialogLayout">
          <p className="formErrors">{formErrors?.name}</p>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Country Name"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.name}
            onChange={handleChange}
          />
          <p className="formErrors">{formErrors?.code}</p>

          <TextField
            autoFocus
            margin="dense"
            id="code"
            name="code"
            label="code"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.code}
            onChange={handleChange}
          />
          <p className="formErrors">{formErrors?.phone_code}</p>
          <TextField
            autoFocus
            margin="dense"
            name="phone_code"
            id="phone_code"
            label="Phone Code"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.phone_code}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
