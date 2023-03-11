import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import getCookie from "../../customHooks/GetCookie";
import validate from "../../customHooks/AdminConfigValidation";

export default function CreateAdmin() {
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [textFieldValue, setTextFieldValue] = React.useState({
    id: "",
    donate: "",
    convert_fee: "",
    cashout_fee: "",
    enable_transfer: "",
    max_qty_buy_nft: "",
    min_coins_buy_amount: "",
    management: "",
    nft_winner_shares: "",
    award_value: "",
    months_of_declare_shares: "",
  });

  const handleSubmit = (e) => {
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
        setTextFieldValue({});
        setOpen(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTextFieldValue({});
  };

  return (
    <div>
      <Button
        style={{ marginBottom: "1rem" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Create New Config
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Admin Config</DialogTitle>
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
            label="Nft winner shares"
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
            label="Cashout fee"
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
            label="Convert fee"
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
            label="Enable transfer"
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
            label="Max Quantity buy nft"
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
            label="Min coins buy amount"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.min_coins_buy_amount}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.months_of_declare_shares}</p>

          <TextField
            autoFocus
            margin="dense"
            id="months_of_declare_shares"
            name="months_of_declare_shares"
            label="Months of declare shares"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.months_of_declare_shares}
            onChange={handleChange}
          />

          <p className="formErrors">{formErrors?.award_value}</p>

          <TextField
            autoFocus
            margin="dense"
            id="award_value"
            name="award_value"
            label="Award value"
            type="text"
            fullWidth
            variant="standard"
            value={textFieldValue.award_value}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
