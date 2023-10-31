import React, { useState } from 'react';
import './styles.css';
import treeImage from './images/tree.png'; // Update the path if the image is in a different location

const Home: React.FC = () => {
  const [savedTrees, setSavedTrees] = useState(0);

  const handleSaveTree = () => {
    setSavedTrees(savedTrees + 1);
  };

  return (
    <div className="container">
      <h1>Welcome to the Tree Saving Page</h1>
      <img src={treeImage} alt="Cartoon tree" className="tree-image" />
      <div className="centered-content">
        <button className="save-tree-button" onClick={handleSaveTree}>
          Save a Tree
        </button>
        <p>Trees Saved: {savedTrees}</p>
      </div>
    </div>
  );
};

export default Home;
