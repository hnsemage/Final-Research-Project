import React, { useState, useEffect } from 'react';
import { Container, Paper,Button, Typography, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Define a CSS class to remove borders
const noBorder = {
    border: 'none',
  };

const UserProfile = () => {
  const navigate = useNavigate();

  const phoneNumber = localStorage.getItem("phone_number");

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('access_token');
  
          // Fetch user data
          const response = await axios.get(`http://localhost:5000/get_user_data/${encodeURIComponent(phoneNumber)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUserData(response.data);
          setLoading(false);
  
          // Fetch Records based on phone number
          const recordsResponse = await axios.get(`http://localhost:5000/get_records/${encodeURIComponent(phoneNumber)}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Add the records data to the user data
          setUserData((prevData) => ({ ...prevData, records: recordsResponse.data }));
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [phoneNumber]);
  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
          User Profile
        </Typography>
        </Box><br/><br/>
        <Box textAlign="center" style={{backgroundColor: "rgba(186, 223, 231, 0.7)"}} sx={{ maxWidth: 900,marginLeft:18,marginRight:18,marginBottom:3,borderRadius:2}} >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : userData ? (
            <Box>
              <Table >
                <TableBody>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Phone Number:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.phone_number}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        First Name:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.first_name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Last Name:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.last_name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                        Email:
                      </Typography>
                    </TableCell>
                    <TableCell style={noBorder}>
                      <Typography variant="h6" gutterBottom style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                        {userData.email}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
          </Box>
        ) : (
          <Typography variant="body1">User data not found.</Typography>
        )}
      </Box><br/><br/>
      <Box >
      {userData && userData.records && (
        <TableContainer component={Paper} style={{backgroundColor: "rgba(186, 223, 231, 0.7)", borderRadius:3}} >
          <Table>
            <TableHead >
              <TableRow >
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Report Type 01
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center",borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Report Value 01
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Report Type 02
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Report Value 02
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Prediction
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Date
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 17,  fontWeight: "bold",color: "black", textAlign:"center", borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody textAlign={'center'}>
              {userData.records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black",  borderLeft: "2px solid black", borderBottom:"2px solid black"}}>
                    {record.report_type1}
                </TableCell>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.report_value1}
                </TableCell>
                  <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.report_type2}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.report_value2}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.prediction}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.date}
                </TableCell>
                <TableCell style={{fontFamily: "Inika", fontSize: 15, color: "black", borderLeft: "2px solid black", borderBottom:"2px solid black" }}>
                    {record.time}
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Box>
      <Box textAlign="center">
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
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
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/home`)}
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
          Home
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
