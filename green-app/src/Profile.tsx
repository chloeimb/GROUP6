// Profile.tsx
import React, { useState } from 'react';

// Import statement for the navigation bar
import DenseAppBar from './Navigation/topbar';

// Import the default profile picture
import defaultProfilePic from './images/defaultProfilePic.png';

import backgroundImage from './images/lightcolorbackground.png'

// Define the types for the user profile
type UserProfile = {
  name: string;
  email: string;
  // Add other profile fields as needed
};

// The Profile component
const Profile: React.FC = () => {
  // State for the user profile
  const [profile, setProfile] = useState<UserProfile>({ name: '', email: '' });
  // State for the profile image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  // State to hold the URL of the uploaded profile image for display
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handler for profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);

      // Create a URL for the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission, send data to the server
    // This is where you would typically integrate with a backend service
  };

  // Image and form container style
  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto'
  };

  // Render the component
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      {/* HTML for the navigation bar */}
      <DenseAppBar></DenseAppBar>
      <h1>Profile</h1>
      <div style={containerStyle}>
        <img 
          src={imagePreviewUrl || defaultProfilePic} 
          alt="Profile" 
          style={{ maxWidth: '50%', height: 'auto' }} 
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
          />
          <input type="file" onChange={handleImageChange} />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;