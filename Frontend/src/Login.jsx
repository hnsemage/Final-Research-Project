import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, FormControl } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [messagePhoneNumberErr, setMessagePhoneNumberErr] = useState("");
  const [messagePasswordErr, setMessagePasswordErr] = useState("");

  const handleLogin = async () => {
    setPhoneNumberErr(false);
    setPasswordErr(false);

    if (phoneNumber === "") {
      setPhoneNumberErr(true);
      setMessagePhoneNumberErr("Phone Number Required");
    } else {
      setMessagePhoneNumberErr("");
    }

    if (password === "") {
      setPasswordErr(true);
      setMessagePasswordErr("Password Required");
    } else {
      setMessagePasswordErr("");
    }

    setError(""); // Clear any previous error messages

    try {
      const response = await axios.post("http://localhost:5000/login", {
        phone_number: phoneNumber,
        password: password,
      });

      if (response.status === 200) {
        // Save the token to localStorage for future requests
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("phone_number",phoneNumber);

        // Redirect to the UserProfile page with phone_number as a parameter
        navigate(`/user-profile`);
      } else {
        setError("Authentication failed. Please check your phone number and password.");
      }
    } catch (error) {
      setError("Authentication failed. Please check your phone number and password.");
    }
  };

  const handleRegistration = () => {
    navigate("/registration"); // Navigate to the registration page
  };


  return (
    <div>
      <Container>
        <Box textAlign="center" m={4}>
          <Typography
            variant="h3"
            style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#C0C2E3" }}
            component="div"
            gutterBottom
          >
            Login
          </Typography>
        </Box>
        <form>
          <Box textAlign="center" m={4}>
            <div>
              <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
                <TextField
                  label={"Phone Number"}
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  variant="filled"
                  name="value01"
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={phoneNumberErr}
                  helperText={messagePhoneNumberErr}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
                <TextField
                  label={"Password"}
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  variant="filled"
                  name="value01"
                  value={password}
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordErr}
                  helperText={messagePasswordErr}
                />
              </FormControl>
            </div>
          </Box>
        </form>
      </Container>
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            m: 3,
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary" 
          onClick={handleRegistration}
          sx={{
            m: 3,
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
          }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            m: 3,
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
          }}
        >
          Back
        </Button>
        {error && (
          <Typography
            variant="body2"
            sx={{
              color: "#BADFE7",
              fontWeight: "bold",
              fontFamily: "Inika",
              fontSize: 16,
              mt: 2,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default Login;
