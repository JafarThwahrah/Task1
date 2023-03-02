import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Swal from "sweetalert2";
import { validate } from "../../custom/CountriesValidation";
export default function CreateCountry({ token }) {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({});
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const headers = { Authorization: `${token}` };
      axios
        .post(
          "https://staging-blockchain-payment.livaat.com/api/countries/create",
          formValues,
          { headers: headers }
        )
        .then((res) => {
          setOpen(false);
          Swal.fire(
            "Success!",
            "New country is added successfully.",
            "success"
          );
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  return (
    <div>
      <Button
        style={{ marginBottom: "1rem" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Create New Country
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialogTitle">Create Country Info</DialogTitle>
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
            onChange={handleChange}
          />
          <p className="formErrors">{formErrors?.code}</p>

          <TextField
            autoFocus
            margin="dense"
            id="code"
            name="code"
            label="Country Code"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <p className="formErrors">{formErrors?.phone_code}</p>

          <TextField
            autoFocus
            margin="dense"
            id="phone_code"
            name="phone_code"
            label="Phone Code"
            type="text"
            fullWidth
            variant="standard"
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
