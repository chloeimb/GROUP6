import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DenseAppBar from './Navigation/topbar';
import defaultBackgroundImage from './images/lightcolorbackground.png';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    width: 500, 
    align : "left",
    color: theme.palette.common.white,
    fontSize: 13,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type UsageActivities = {
  automobileusage: number;
  foodwaste: number;
  waterusage: number;
  electricityusage: number;
  flightusage: number;
};


const Profile: React.FC = () => {
  const [usageActivities, setUsageActivities] = useState<UsageActivities>({
    automobileusage: 0,
    foodwaste: 0,
    waterusage: 0,
    electricityusage: 0,
    flightusage: 0,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {

    setUsageActivities({
      automobileusage: 15000,
      foodwaste: 450,
      waterusage: 29000,
      electricityusage: 11000,
      flightusage: 3000,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsageActivities({ ...usageActivities, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock API URL for testing (using JSONPlaceholder)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    // Simulate a POST request to update daily activities data
    axios
      .post(apiUrl, usageActivities)
      .then((response) => {
        console.log('Daily activities updated successfully:', response.data);
        setEditMode(false); // Switch back to display mode after successful update
      })
      .catch((error) => {
        console.error('Error updating daily activities:', error);
      });
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: 'auto',
    color: 'white',
    size: '30px',
  };



  return (
    <div style={{ 
      height: '115vh', 
      backgroundImage: `url(${defaultBackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t: any) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center', } as any}>
      <DenseAppBar />

      <div style={containerStyle}>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <input type="number" name="automobileusage" placeholder="Autombile Usage (in miles / yr)" value={usageActivities.automobileusage} onChange={handleInputChange} />
            <input type="number" name="foodwaster" placeholder="Food Waste (in pounds / yr)" value={usageActivities.foodwaste} onChange={handleInputChange} />
            <input type="number" name="waterusage" placeholder="Water Usage (in gallons / yr)" value={usageActivities.waterusage} onChange={handleInputChange} />
            <input type="number" name="electrictyusage" placeholder="Electricty Usage (in kWh / yr)" value={usageActivities.electricityusage} onChange={handleInputChange} />
            <input type="number" name="flightusage" placeholder="Flight Usage (in miles / yr)" value={usageActivities.flightusage} onChange={handleInputChange} />
            <button type="submit">Update Usage Activities</button>

          </form>
        ) : (
          <>
            <div>
              <p><strong>Automobile Usage:</strong> {usageActivities.automobileusage} miles / yr</p>
              <p><strong>Food Waste:</strong> {usageActivities.foodwaste} pounds / yr</p>
              <p><strong>Water Usage:</strong> {usageActivities.waterusage} gallons / yr</p>
              <p><strong>Electricty Usage:</strong> {usageActivities.electricityusage} kWh / yr</p>
              <p><strong>Flight Usage:</strong> {usageActivities.flightusage} miles / yr</p>

            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          
          <div>
      <TableContainer>
      <Table sx={{ width: 650 , height: 110,  border : 5}} component={Paper}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Personal Carbon Footprint Summary</StyledTableCell>
            <StyledTableCell align="right">Pounds of CO2</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <tr><StyledTableCell align="left">Automobile Usage</StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.automobileusage * 0.88184905)}</StyledTableCell></tr>
          <tr><StyledTableCell align="left">Food Waste </StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.foodwaste * 3.8)}</StyledTableCell></tr>
          <tr><StyledTableCell align="left">Water Usage </StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.waterusage * .18)}</StyledTableCell></tr>
          <tr><StyledTableCell align="left">Electricty Usage </StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.electricityusage * 2.07)}</StyledTableCell></tr>
          <tr><StyledTableCell align="left">Flight Usage </StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.flightusage*.901)}</StyledTableCell></tr>
          <tr><StyledTableCell align="left">Your Total Carbon Footprint</StyledTableCell>
          <StyledTableCell align="right">{Math.round(usageActivities.automobileusage * 0.88184905) + Math.round(usageActivities.foodwaste * 3.8) + Math.round(usageActivities.waterusage * .18) + Math.round(usageActivities.electricityusage * 2.07) + Math.round(usageActivities.flightusage*.901)}</StyledTableCell></tr>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
        )}
        </div>
        </div>
  );
};



export default Profile;


