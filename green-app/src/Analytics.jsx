import React from 'react';
import chartImage from './images/Chart.png'; // Update the path if the image is in a different location
import DenseAppBar from './Navigation/topbar';

const Analytics = () => {
  return (
    <div><DenseAppBar></DenseAppBar>
        <div className="container">
      <h1>Current Carbon Footprint Chart</h1>
      <img src={chartImage} alt="Carbon FootPrint Chart" className="chart-image" />
      <div className="centered-content">
      </div>
    </div>
    </div>

  );
};

export default Analytics;

