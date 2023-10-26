import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Container,Box,Button } from '@mui/material';
import { Table,  TableBody, TableRow, TableCell } from '@mui/material';
import { useNavigate } from "react-router-dom";


function InformationLogin(){
    const navigate = useNavigate();
    const phoneNumber = localStorage.getItem("phone_number");

    const [data, setData] = useState({});

    useEffect(() =>{
        //Make an HTTP GET request to your Flask backend when the component mounts
        axios.get(`http://localhost:5000/predictlogin/${phoneNumber}`)
            .then((response)=>{
                setData(response.data);
            })
            .catch((error)=>{
                console.error('Error fetching data: ', error);
            });
    },[]); //The empty array [] means this effect runs once after the intial render

    const{prediction, matching_info} = data;

    // Define a function to render links as clickable anchors
    const renderValue = (value) => {
        const linkStyle = {
            color: '#BADFE7', 
          };
        if (typeof value === 'string') {
            const regex = /(http[s]?:\/\/[^\s]+)/g; // Regular expression to match URLs
            const parts = value.split(regex);

            return parts.map((part, index) => {
                if (part.match(regex)) {
                    return (
                        <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                            {part}
                        </a>
                    );
                } else {
                    return part;
                }
            });
        } else if (Array.isArray(value)) {
            return value.map((item, index) => (
                <span key={index}>
                    {renderValue(item)}
                    {index < value.length - 1 && <br />}
                </span>
            ));
        } else {
            return 'N/A';
        }
    };
      
    return(
        <div>
            <Container>
                <Box textAlign="center">
                    <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                        Summarized Information
                    </Typography>
                </Box>
                <Box textAlign="center" >
                    <Box margin={3} >
                        
                            <Typography variant="h4"style={{fontFamily: "Inika", fontSize: 30, fontWeight: "bold", color: "#BADFE7", }} component="div" gutterBottom>
                                Prediction
                            </Typography>
                            <Typography variant="body1" style={{fontFamily: "Inika", fontSize: 16, color: "#BADFE7", }} component="div">
                                {prediction?.toUpperCase()}
                            </Typography>
                        
                    </Box>  
                    <Box >
                            <Typography variant="h4"style={{fontFamily: "Inika", fontSize: 30, fontWeight: "bold", color: "#BADFE7", }} component="div" gutterBottom>
                                Information
                            </Typography>
                            <Table style={{backgroundColor: "rgba(186, 223, 231, 0.7)"}} sx={{ maxWidth: 900,marginLeft:18,marginRight:18,marginBottom:3 }} >
                                <TableBody>
                                    {Object.keys(matching_info || {}).map((key) => (
                                        key !== 'Learn More About Your Reports' &&
                                        <TableRow key={key}>
                                            <TableCell style={{fontFamily: "Inika", fontSize: 20,  fontWeight: "bold",color: "black", textAlign:"center"}}>
                                                {key}
                                            </TableCell>
                                            <TableCell>
                                                <Typography style={{fontFamily: "Inika", fontSize: 17, color: "black", }}>
                                                    {key === 'Learn More About Your Reports' ? (
                                                        <span>{renderValue(matching_info[key])}</span>
                                                    ) : (
                                                        matching_info[key] ? (
                                                            matching_info[key].map((item, index) => (
                                                                <span key={index} style={{ width: '10px' }}>
                                                                    {renderValue(item)}
                                                                    {index < matching_info[key].length - 1 && <br />}
                                                                </span>
                                                            ))
                                                        ) : ('N/A')
                                                    )}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                    </Box>  
                    {matching_info && matching_info['Learn More About Your Reports'] && (
                        <Box margin={3}>
                            <Typography variant="h4" style={{fontFamily: 'Inika',fontSize: 30,fontWeight: 'bold',color: '#BADFE7',}}component="div"gutterBottom>
                                Learn More About Your Reports
                            </Typography>
                            <Typography style={{ fontFamily: 'Inika', fontSize: 17, color: 'black' }}>
                                {renderValue(matching_info['Learn More About Your Reports'])}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box textAlign="center">
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/user-profile`)}
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
      </Box>
            </Container>
        </div>
    )
}


export default InformationLogin;