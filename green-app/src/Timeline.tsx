import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DenseAppBar from './Navigation/topbar';

const Timeline: React.FC = () => {
  const location = useLocation();
  const { dailyActivities } = location.state as any;

  const [timelineData, setTimelineData] = useState<{ day: number; recycling: number; biking: number; plantingTrees: number; reducingWaste: number; }[]>([]);

  useEffect(() => {
    // Function to calculate timeline data based on daily activities
    const calculateTimelineData = () => {
      const data: { day: number; recycling: number; biking: number; plantingTrees: number; reducingWaste: number; }[] = [];
      let currentDay = 1;

      // Initial values
      let { recycling, biking, plantingTrees, reducingWaste } = dailyActivities;
      data.push({ day: currentDay, recycling, biking, plantingTrees, reducingWaste });

      // Calculate daily progress based on activities
      while (currentDay <= 30) { // Assuming a month-long timeline, you can adjust as needed
        recycling += dailyActivities.recycling / (1 - dailyActivities.cfrr / 100);
        biking += dailyActivities.biking / (1 - dailyActivities.cfrr / 100);
        plantingTrees += dailyActivities.plantingTrees / (1 - dailyActivities.cfrr / 100);
        reducingWaste += dailyActivities.reducingWaste / (1 - dailyActivities.cfrr / 100);

        currentDay++;
        data.push({ day: currentDay, recycling, biking, plantingTrees, reducingWaste });
      }

      setTimelineData(data);
    };

    calculateTimelineData();
  }, [dailyActivities]);

  return (
    <div>
      <DenseAppBar />
      <h2 style={{ textAlign: 'center' }}>Timeline</h2>
      <div style={{ maxWidth: '800px', margin: 'auto', color: 'white', fontSize: '20px' }}>
        <LineChart
          width={800}
          height={400}
          data={timelineData}
          margin={{ top: 5, right: 30, left: 20, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -10 }} />
          <YAxis label={{ value: 'Amount per Activity', angle: -90, position: 'insideLeft', dy: 70 }} />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ marginTop: '5px' }}
            payload={[
              { value: 'Recycling', type: 'line', color: '#8884d8' },
              { value: 'Biking', type: 'line', color: '#82ca9d' },
              { value: 'Planting Trees', type: 'line', color: '#ffc658' },
              { value: 'Reducing Waste', type: 'line', color: '#ff7300' },
            ]}
          />
          <Line type="monotone" dataKey="recycling" stroke="#8884d8" />
          <Line type="monotone" dataKey="biking" stroke="#82ca9d" />
          <Line type="monotone" dataKey="plantingTrees" stroke="#ffc658" />
          <Line type="monotone" dataKey="reducingWaste" stroke="#ff7300" />
        </LineChart>
        <button>
              <Link to={{ pathname: '/home'}}>Back</Link>
            </button>
      </div>
    </div>
  );
};

export default Timeline;
