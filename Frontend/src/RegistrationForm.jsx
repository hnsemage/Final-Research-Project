import React, { useState } from 'react';
import { Container, Typography, TextField, Button,Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {

  const navigate = useNavigate();


  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [messageFirstNameErr, setMessageFirstNameErr] = useState("");
  const [messageLastNameErr, setMessageLastNameErr] = useState("");
  const [messageEmailErr, setMessageEmailErr] = useState("");
  const [messagePhoneNumberErr, setMessagePhoneNumberErr] = useState("");
  const [messagetPasswordErr, setMessagetPasswordErr] = useState("");

  const [recheckFormMessage, setRecheckFormMessage] = useState('');


  const handleSubmit = async (e) => {
    
    
    setFirstNameErr(false);
    setLastNameErr(false);
    setEmailErr(false);
    setPhoneNumberErr(false);
    setPasswordErr(false);

    if (first_name === "") {
      setFirstNameErr(true);
      setMessageFirstNameErr("First Name Required");
    } else {
      setMessageFirstNameErr("");
    }

    if (last_name === "") {
      setLastNameErr(true);
      setMessageLastNameErr("Last Name Required");
    } else {
      setMessageLastNameErr("");
    }

    if (email === "") {
      setEmailErr(true);
      setMessageEmailErr("Type Required");
    } else {
      setMessageEmailErr("");
    }

    if (phone_number === "") {
      setPhoneNumberErr(true);
      setMessagePhoneNumberErr("Value Required");
    }else {
      setMessagePhoneNumberErr("");
    }

    if (password === "") {
      setPasswordErr(true);
      setMessagetPasswordErr("Value Required");
    }else {
      setMessagetPasswordErr("");
    }
    
    if (first_name === "" || last_name === "" || email === "" || phone_number === "" || password === "") {
      setRecheckFormMessage('Recheck The Form');
    } else {
      setRecheckFormMessage('');

      const dataToSend = {
        first_name: first_name, 
        last_name: last_name, 
        email: email,     
        phone_number: phone_number ,
        password:password,
      };
        
         // Send a POST request to your backend endpoint
      axios
      .post('http://localhost:5000/register', dataToSend, {
        headers: {'Content-Type': 'application/json',},
      })
      .then((response) => {
        console.log(response.data);
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });            
  }
  e.preventDefault();
}

  return (
    <Container>
      <Box textAlign="center" m={4}>
      <Typography variant="h5" gutterBottom style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#C0C2E3" }}>
        Register
      </Typography>
      <form  >
      <TextField
          name="first_name"
          label="First Name"
          id="filled-search"
          variant="filled"
          InputLabelProps={{
            style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
          }}
          inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
          sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
          fullWidth
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          error={firstNameErr}
          helperText={messageFirstNameErr}
        /><br/>
        <TextField
          name="last_name"
          label="Last Name"
          id="filled-search"
          variant="filled"
          InputLabelProps={{
            style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
          }}
          inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
          sx={{ borderRadius: "10px", borderColor: "#BADFE7"}}
          fullWidth
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          error={lastNameErr}
          helperText={messageLastNameErr}
        /><br/>
        
        <TextField
          name="email"
          type="email"
          label="Email"
          id="filled-search"
          variant="filled"
          InputLabelProps={{
            style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
          }}
          inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
          sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailErr}
          helperText={messageEmailErr}
        /><br/>
        <TextField
          name="phone_number"
          label="Phone Number"
          id="filled-search"
          variant="filled"
          InputLabelProps={{
            style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
          }}
          inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
          sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
          fullWidth
          required
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={phoneNumberErr}
          helperText={messagePhoneNumberErr}
        /><br/>
        <TextField
          name="password"
          type="password"
          label="Password"
          id="filled-search"
          variant="filled"
          InputLabelProps={{
            style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
          }}
          inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 }}}
          sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordErr}
          helperText={messagetPasswordErr}
        /><br/>
        
        <Button
  type="submit"
  variant="contained"
  onClick={handleSubmit}
  color="primary"
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
  onClick={() => navigate('/login')}
  sx={{
    m: 3,
    width: '20ch',
    backgroundColor: "#BADFE7",
    color: "black",
    fontWeight: "bold",
    fontFamily: "Inika",
    fontSize: 20,
  }}
>
  Login
</Button>
<Typography
  variant="body2"
  sx={{
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Inika',
    fontSize: 16,
  }}
>
  {recheckFormMessage}
</Typography>

          
      </form>
      </Box>
      
    </Container>
  );
};

export default RegistrationForm;
