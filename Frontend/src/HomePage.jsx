import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function HomePage() {
  return (
    <div>
      {/* Centered Topic */}
      <Box textAlign="center">
        <Typography variant="h2" style={{ fontFamily: 'Inika', fontSize: 48, fontWeight: 'bold',color: '#FFFFFF' }}>
        Get all your medical reports summary by selecting the report name and entering the respective value...
        </Typography>
      </Box>

      {/* Main Content Container */}
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 200px)">
        <Box border={1} p={2} borderRadius={4} display="flex" flexDirection="column" alignItems="flex-start">
          {/* Dropdown 1 */}
          <FormControl>
            <InputLabel>Dropdown 1</InputLabel>
            <Select>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
            </Select>
          </FormControl>

          {/* Textbox 1 */}
          <TextField label="Textbox 1" />

          {/* Dropdown 2 */}
          <FormControl>
            <InputLabel>Dropdown 2</InputLabel>
            <Select>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
            </Select>
          </FormControl>

          {/* Textbox 2 */}
          <TextField label="Textbox 2" />
        </Box>
      </Box>

      {/* Buttons (Bottom Right) */}
      <Box display="flex" justifyContent="flex-end" mt={2} pr={2}>
        <Button variant="contained" color="#25274D">
          Button 1
        </Button>
        <Button variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
          Button 2
        </Button>
      </Box>
    </div>
  );
}

export default HomePage;
