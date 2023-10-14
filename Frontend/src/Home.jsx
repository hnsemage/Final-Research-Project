import React, { useState } from "react";
import { Button, TextField, FormControl, Box, Typography, MenuItem,styled } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


const dropdownBackgroundColor = '#25274D';

const BlackMenuItem = styled(MenuItem)({
  backgroundColor: '#25274D', // Set the background color to black
  '&:hover': {
    backgroundColor: '#25274D', // Keep the background color black on hover
  },
  '&.Mui-selected': {
    backgroundColor: dropdownBackgroundColor, // Set the selected item background color
  },
  
});

const Home = () => {

  const navigate = useNavigate();
  

  const [type01, setType01] = useState("");
  const [value01, setValue01] = useState("");
  const [type02, setType02] = useState("");
  const [value02, setValue02] = useState("");

  const [type01Err, setType01Err] = useState(false);
  const [value01Err, setValue01Err] = useState(false);
  const [type02Err, setType02Err] = useState(false);
  const [value02Err, setValue02Err] = useState(false);

  const [messageType01Err, setMessageType01Err] = useState("");
  const [messageValue01Err, setMessageValue01Err] = useState("");
  const [messageType02Err, setMessageType02Err] = useState("");
  const [messageValue02Err, setMessageValue02Err] = useState("");

  const [reportTypes, setReportTypes] = useState(['TSH', 'T4', 'HBA1C', 'PPBS', 'FBS']);

  const [secondDropDownOptions, setSecondDropDownOptions] = useState([]);

  const handleFirstDropDownChange=(event) =>{
    const selectedType = event.target.value;
    setType01(selectedType);

  if(selectedType === 'TSH'){
    setSecondDropDownOptions(['T4']);
  }else if(selectedType === 'T4'){
    setSecondDropDownOptions(['TSH']);
  }else if(selectedType === 'HBA1C'){
    setSecondDropDownOptions(['PPBS','FBS']);
  }else if (selectedType === 'PPBS' || selectedType === 'FBS'){
    setSecondDropDownOptions(['HBA1C']);
  }
  }

  const handleAdd = (event) => {
    setType01Err(false);
    setValue01Err(false);
    setType02Err(false);
    setValue02Err(false);

    if (type01 === "") {
      setType01Err(true);
      setMessageType01Err("Type Required");
    } else {
      setMessageType01Err("");
    }

    if (value01 === "") {
      setValue01Err(true);
      setMessageValue01Err("Value Required");
    } else {
      setMessageValue01Err("");
    }

    if (type02 === "") {
      setType02Err(true);
      setMessageType02Err("Type Required");
    } else {
      setMessageType02Err("");
    }

    if (value02 === "") {
      setValue02Err(true);
      setMessageValue02Err("Value Required");
    } else {
      setMessageValue02Err("");
    }

    event.preventDefault();
    if (type01 === "" || value01 === "" || type02 === "" || value02 === "") {
      alert("Recheck The Form");
    } else {
      const dataToSend = {
        report_type1: type01, 
        report_type2: type02, 
        value1: value01,     
        value2: value02      
      };
      alert("Submitted... Please Wait...");

      // Send a POST request to your backend endpoint
      axios
      .post("http://localhost:5000/predict", dataToSend, {
        headers: {'Content-Type': 'application/json',},
      })
      .then((response) => {
        console.log(response.data);
        navigate('/info');
      })
      .catch((error) => {
        console.error(error);
      });
    }

    event.preventDefault();
  };

  return (
    <div>
      <Container>
        <Box textAlign="center" m={4}>
          <Typography variant="h3" style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#C0C2E3" }} component="div" gutterBottom>
            Get all your medical reports summary
          </Typography>
          <Typography variant="h3" style={{ fontFamily: "Inika", fontSize: 33, fontWeight: "bold", color: "#BADFE7" }} component="div" gutterBottom>
            by selecting the report name and entering the respective value...
          </Typography><br />
          <Typography variant="h3" style={{ fontFamily: "Inika", fontSize: 18, color: "#e6f1f6" }} component="div" gutterBottom>
            Please double-check the report types and their respective values before you hit the submit button
            <br />in order to get a more accurate result...
          </Typography>
        </Box>
        <br /><br />
        <form>
          <Box textAlign="center" m={4}>
            <div>
              <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard" >
                <TextField
                  select
                  label="Select the Blood Report Type 01"
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "black", fontSize: 20 } }}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  id="filled-search"
                  variant="filled"
                  name="type01"
                  value={type01}
                  required
                  error={type01Err}
                  helperText={messageType01Err}
                  onChange={handleFirstDropDownChange} >
                  {reportTypes.map((type) => (
                    <BlackMenuItem key={type} value={type}>
                    <span style={{ color: "#BADFE7",fontFamily: "Inika", fontSize: 20 }}>{type}</span>
                  </BlackMenuItem>
                  ))}
                  </TextField>
              </FormControl>
              <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
                <TextField
                  label={`Enter the ${type01.toUpperCase()} value`}
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 } }}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  id="filled-search"
                  variant="filled"
                  name="value01"
                  value={value01}
                  required
                  error={value01Err}
                  helperText={messageValue01Err}
                  onChange={(event) => { setValue01(event.target.value); }} />
              </FormControl>
            </div>
            <div>
            <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard" >
                <TextField
                  select
                  label="Select the Blood Report Type 02"
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "#BADFE7", fontSize: 20 } }}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  id="filled-search"
                  variant="filled"
                  name="type02"
                  required
                  error={type02Err}
                  helperText={messageType02Err}
                  onChange={(event) => {
                    setType02(event.target.value);
                  }} 
                  value ={type02}>
                  {secondDropDownOptions.map((type) => (
                    <BlackMenuItem key={type} value={type}>
                    <span style={{ color: "#BADFE7",fontFamily: "Inika", fontSize: 20 }}>{type}</span>
                  </BlackMenuItem>
                    
                  ))}
                  </TextField>
              </FormControl>
              <FormControl fullWidth sx={{ m: 2, width: "50ch" }} variant="standard">
                <TextField
                  label={`Enter the ${type02.toUpperCase()} value`}
                  id="filled-search"
                  variant="filled"
                  name="value02"
                  value={value02}
                  InputLabelProps={{
                    style: { color: "#BADFE7", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                  }}
                  inputProps={{ style: { color: "#BADFE7", fontFamily: "Inika", fontSize: 20 } }}
                  sx={{ borderRadius: "10px", borderColor: "#BADFE7" }}
                  required
                  error={value02Err}
                  helperText={messageValue02Err}
                  onChange={(event) => { setValue02(event.target.value); }} />
              </FormControl>
            </div>
            <br />
          </Box>
          <Box textAlign="right">
            <Button variant="contained" type="submit" onClick={handleAdd}
              sx={{ m: 3, width: "20ch", backgroundColor: "#BADFE7", color: "black", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default Home;
