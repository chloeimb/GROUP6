import React, { useState } from 'react';
import DenseAppBar from './Navigation/topbar';
import defaultBackgroundImage from './images/lightcolorbackground.png';

const AddEntry = () => {
  const [entries, setEntries] = useState([
    { id: 1, content: 'Planted a new tree in the backyard.' },
    { id: 2, content: 'Started using a reusable water bottle.' },
    { id: 3, content: 'Participated in a local park cleanup.' },
    { id: 4, content: 'Switched to a plant-based diet.' },
    { id: 5, content: 'Used public transportation instead of driving to work.' },
  ]);
  const [newEntry, setNewEntry] = useState('');

  const handleAddEntry = () => {
    if (newEntry) {
      const newId = entries.length > 0 ? entries[entries.length - 1].id + 1 : 1;
      setEntries([...entries, { id: newId, content: newEntry }]);
      setNewEntry('');
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    color: 'white',
    fontSize: '20px',
    padding: '20px', // Padding added for spacing inside the div
  };

  const entryInputStyle = {
    marginRight: '10px', // Space between input and button
  };

  const sectionSpacingStyle = {
    marginBottom: '30px', // Space between sections
  };

  return (
    <div style={{ 
      height: '100vh',
      backgroundImage: `url(${defaultBackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t: any) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } as any}>
      <DenseAppBar></DenseAppBar>
      <div style={{ ...containerStyle, ...sectionSpacingStyle }}>
        <h1>Add Entry to Going Green Journal</h1>
        <div>
          <input
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your green activity..."
            style={entryInputStyle}
          />
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>
      </div>
      <div style={{ ...containerStyle, ...sectionSpacingStyle }}>
        <h2>Journal Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddEntry;
