import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DenseAppBar from './Navigation/topbar';
import defaultBackgroundImage from './images/lightcolorbackground.png';

type DailyActivities = {
  recycling: number;
  biking: number;
  plantingTrees: number;
  reducingWaste: number;
  other: string;
};

const Profile: React.FC = () => {
  const [dailyActivities, setDailyActivities] = useState<DailyActivities>({
    recycling: 0,
    biking: 0,
    plantingTrees: 0,
    reducingWaste: 0,
    other: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch daily activities data when the component mounts
    // You can replace this with your actual logic to fetch daily activities data
    // For now, I'm using dummy daily activities
    setDailyActivities({
      recycling: 2,
      biking: 5,
      plantingTrees: 10,
      reducingWaste: 3,
      other: 'Other activities description',
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyActivities({ ...dailyActivities, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock API URL for testing (using JSONPlaceholder)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    // Simulate a POST request to update daily activities data
    axios
      .post(apiUrl, dailyActivities)
      .then((response) => {
        console.log('Daily activities updated successfully:', response.data);
        setEditMode(false); // Switch back to display mode after successful update
      })
      .catch((error) => {
        console.error('Error updating daily activities:', error);
      });
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    color: 'white',
    size: '30px',
  };

  return (
    <div style={{ 
      height: '100vh', 
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
            <input type="number" name="recycling" placeholder="Recycling (in kg)" value={dailyActivities.recycling} onChange={handleInputChange} />
            <input type="number" name="biking" placeholder="Biking (in km)" value={dailyActivities.biking} onChange={handleInputChange} />
            <input type="number" name="plantingTrees" placeholder="Planting Trees (number)" value={dailyActivities.plantingTrees} onChange={handleInputChange} />
            <input type="number" name="reducingWaste" placeholder="Reducing Waste (in kg)" value={dailyActivities.reducingWaste} onChange={handleInputChange} />
            <input type="text" name="other" placeholder="Other Activities" value={dailyActivities.other} onChange={handleInputChange} />
            <button type="submit">Update Daily Activities</button>
          </form>
        ) : (
          <>
            <div>
              <p><strong>Recycling:</strong> {dailyActivities.recycling} kg</p>
              <p><strong>Biking:</strong> {dailyActivities.biking} km</p>
              <p><strong>Planting Trees:</strong> {dailyActivities.plantingTrees} trees</p>
              <p><strong>Reducing Waste:</strong> {dailyActivities.reducingWaste} kg</p>
              <p><strong>Other Activities:</strong> {dailyActivities.other}</p>
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
