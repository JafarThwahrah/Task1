import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const theme = createTheme();
const errorStyle = {
  color: "red",
  fontSize: "16px",
  marginTop: "2rem",
  marginBottom: "0",
};

const Login = () => {
  const initialValue = { email: "", password: "" };

  const [loginData, setLoginData] = useState(
    getCookie("id") ? getCookie("id") : null
  );
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData) {
      navigate(`/admin/`);
    }
  }, [loginData]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = (data) => {
    const errors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email =
        "Wrong email format, Your input should look like example@gmail.com";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  function setCookie(name, value, days) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));

    axios
      .post(
        "https://staging-blockchain-payment.livaat.com/api/admins/login",
        formValues
      )
      .then((res) => {
        setCookie("id", `${res.data.data.id}`, 1);
        setCookie("email", `${res.data.data.email}`, 1);
        setCookie("name", `${res.data.data.name}`, 1);
        setLoginData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setFormErrors({ creds: "wrong email or password" });
        }
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container className="py-5" component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography style={{ color: "black" }} component="h1" variant="h5">
              Sign in
            </Typography>
            <p style={errorStyle}>{formErrors?.creds}</p>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <p style={errorStyle}>{formErrors.email}</p>

              <TextField
                type="text"
                style={{
                  backgroundColor: "#Dce8ec",
                  borderRadius: "5px",
                  opacity: "70%",
                }}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <p style={errorStyle}>{formErrors.password}</p>
              <TextField
                style={{
                  backgroundColor: "#Dce8ec",
                  borderRadius: "5px",
                  opacity: "70%",
                }}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
