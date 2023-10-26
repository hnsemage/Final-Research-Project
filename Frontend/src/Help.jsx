import { Container,Box,Typography } from '@mui/material';
import React from 'react';

function Help() {
  return (
  <div>
    <Container>
      <Box textAlign="center" marginTop={10}>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
        How to choose the report type that your want to get summarized information?
        </Typography>
      </Box>
      <Box textAlign="left" style={{backgroundColor: "rgba(186, 223, 231, 0.7)",borderRadius: "15px"}} padding={4} marginTop={15} >
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            i. Select the number of reports that you are about to get the summary
        </Typography><br/>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            ii. Click on the arrow button on the drop down list and choose the report type you need to view the summary of the result
        </Typography><br/>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            iii. Enter the medical test result values which you can get from the received document and click submit
        </Typography><br/>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            iv. Next you will be directed to the summarized information of your test result
        </Typography>
      </Box>
    </Container>
    <Container>
      <Box textAlign="center" marginTop={10}>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
        How to Login and Register?
        </Typography>
      </Box>
      <Box textAlign="left" style={{backgroundColor: "rgba(186, 223, 231, 0.7)",borderRadius: "15px"}} padding={4} marginTop={15} >
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            i. If you want to Login or register to the system, please click the 'Go To Login' button in the Home page.
        </Typography><br/>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            ii. Then if you are already registered to the system, enter your phone number and password and click 'Login' to login. You will be directed to yout profile which contain your information and the past medical records.
        </Typography><br/>
        <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 20, fontWeight: "bold", color: "black", }} component="div" gutterBottom>
            iii. If you have not yet regitered to the system click 'Register button'. Then you will direct to a form which you should inpu the required details and then click 'Register ' button to register. And you will be directed to Login page. 
        </Typography><br/>
      </Box>
    </Container><br/><br/>
  </div>
  );
}

export default Help;