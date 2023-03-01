import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
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

  const handleSubmit = (id) => {
    console.log(id);
  };
  const handleChange = (e) => {
    setTextFieldValue({
      ...textFieldValue,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Admin configuration</DialogTitle>
        <DialogContent>
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
          <Button onClick={(e) => handleSubmit(props.id)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
