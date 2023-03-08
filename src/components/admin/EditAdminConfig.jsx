import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import "../../styles/EditDialog.css";
import axios from "axios";
import getCookie from "../../custom/GetCookie";
import Swal from "sweetalert2";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [textFieldValue, setTextFieldValue] = React.useState({
    id: props.id,
    donate: props.donate,
    convert_fee: props.convert_fee,
    cashout_fee: props.cashout_fee,
    enable_transfer: props.enable_transfer,
    max_qty_buy_nft: props.max_qty_buy_nft,
    min_coins_buy_amount: props.min_coins_buy_amount,
    management: props.management,
    nft_winner_shares: props.nft_winner_shares,
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
        "https://staging-blockchain-payment.livaat.com/api/admin/config/update",
        textFieldValue,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        setOpen(false);
        props.setIsEdited(!props.isEdited);
        Swal.fire(
          "Success!",
          "Admin Configuration updated Successfully.",
          "success"
        );
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
    console.log(data);
    if (!data.donate) {
      errors.donate = "donate is required";
    }
    if (!data.management) {
      errors.management = "management is required";
    }
    if (!data.nft_winner_shares) {
      errors.nft_winner_shares = "nft_winner_shares is required";
    }

    if (!data.convert_fee) {
      errors.convert_fee = "convert_fee is required";
    }

    if (!data.cashout_fee) {
      errors.cashout_fee = "cashout_fee is required";
    }
    if (!data.enable_transfer) {
      errors.enable_transfer = "enable_transfer is required";
    }
    if (!data.max_qty_buy_nft) {
      errors.max_qty_buy_nft = "max_qty_buy_nft is required";
    }
    if (data.min_coins_buy_amount === 0) {
      errors.min_coins_buy_amount = "";
    } else if (!data.min_coins_buy_amount) {
      errors.min_coins_buy_amount = "min_coins_buy_amount is required";
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
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.cashout_fee}</p>

          <TextField
            autoFocus
            margin="dense"
            id="cashout_fee"
            name="cashout_fee"
            label="cashout_fee"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.cashout_fee}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.convert_fee}</p>

          <TextField
            autoFocus
            margin="dense"
            id="convert_fee"
            name="convert_fee"
            label="convert_fee"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.convert_fee}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.enable_transfer}</p>

          <TextField
            autoFocus
            margin="dense"
            id="enable_transfer"
            name="enable_transfer"
            label="enable_transfer"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.enable_transfer}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.max_qty_buy_nft}</p>

          <TextField
            autoFocus
            margin="dense"
            id="max_qty_buy_nft"
            name="max_qty_buy_nft"
            label="max_qty_buy_nft"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.max_qty_buy_nft}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.min_coins_buy_amount}</p>

          <TextField
            autoFocus
            margin="dense"
            id="min_coins_buy_amount"
            name="min_coins_buy_amount"
            label="min_coins_buy_amount"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.min_coins_buy_amount}
            onChange={handleChange}
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
            onChange={handleChange}
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
