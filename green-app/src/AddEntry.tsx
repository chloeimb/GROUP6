import React, { useState } from 'react';
import DenseAppBar from './Navigation/topbar';

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

  return (
    <div style={{ backgroundColor: '#228B22', color: 'white', padding: '20px' }}>
      <DenseAppBar></DenseAppBar>
      <h1>Add Entry to Going Green Journal</h1>
      <div>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your green activity..."
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>
      <h2>Journal Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddEntry;
