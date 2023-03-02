import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import "../../styles/Table1Dialog.css";
import axios from "axios";
import getCookie from "../../custom/GetCookie";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [textFieldValue, setTextFieldValue] = React.useState({
    donate: props.donate,
    management: props.management,
    nft_winner_shares: props.nft_winner_shares,
    serene_winner_shares: props.serene_winner_shares,
    fees: props.fees,
    award_value: props.award_value,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    setFormErrors(validate(textFieldValue));
    const token = getCookie("token");
    const headers = { authorization: token };
    axios
      .post(
        "https://staging-blockchain-payment.livaat.com/api/admin/config/store",
        textFieldValue,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setTextFieldValue({
      ...textFieldValue,
      [e.target.name]: e.target.value,
    });
  };
  const validate = (data) => {
    const errors = {};

    if (!data.donate) {
      errors.donate = "donate is required";
    }
    if (!data.management) {
      errors.management = "management is required";
    }
    if (!data.nft_winner_shares) {
      errors.nft_winner_shares = "nft_winner_shares is required";
    }
    if (!data.serene_winner_shares) {
      errors.serene_winner_shares = "serene_winner_shares is required";
    }
    if (!data.fees) {
      errors.fees = "fees is required";
    }
    if (!data.award_value) {
      errors.award_value = "award_value is required";
    }

    return errors;
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialogTitle">
          Update Admin configuration
        </DialogTitle>
        <DialogContent className="dialogLayout">
          <p className="formErrors">{formErrors?.donate}</p>
          <TextField
            autoFocus
            margin="dense"
            id="donate"
            name="donate"
            label="Donate"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.donate}
            onChange={handleChange}
          />
          <p className="formErrors">{formErrors?.management}</p>
          <TextField
            autoFocus
            margin="dense"
            id="management"
            name="management"
            label="Management"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.management}
          />
          <p className="formErrors">{formErrors?.nft_winner_shares}</p>

          <TextField
            autoFocus
            margin="dense"
            id="nft_winner_shares"
            name="nft_winner_shares"
            label="nft_winner_shares"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.nft_winner_shares}
          />
          <p className="formErrors">{formErrors?.serene_winner_shares}</p>

          <TextField
            autoFocus
            margin="dense"
            id="serene_winner_shares"
            name="serene_winner_shares"
            label="serene_winner_shares"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.serene_winner_shares}
          />
          <p className="formErrors">{formErrors?.fees}</p>

          <TextField
            autoFocus
            margin="dense"
            id="fees"
            name="fees"
            label="fees"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.fees}
          />
          <p className="formErrors">{formErrors?.award_value}</p>

          <TextField
            autoFocus
            margin="dense"
            id="award_value"
            name="award_value"
            label="award_value"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.award_value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e, props.id)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
