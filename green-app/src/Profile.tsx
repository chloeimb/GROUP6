// Profile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DenseAppBar from './Navigation/topbar';
import defaultProfilePic from './images/defaultProfilePic.png';
import backgroundImage from './images/lightcolorbackground.png';

type UserProfile = {
  name: string;
  email: string;
  // Add other profile fields as needed
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({ name: '', email: '' });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);


  // fetch user data when component mounts 
  // replace with actual logic for fetching user data
  // this is a dummy user object
  useEffect(() => {
    setProfile({ name: 'John Doe', email: 'john@example.com'});
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock API URL for testing (using JSONPlaceholder)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    // Simulate a POST request to update user data
    axios.post(apiUrl, { name: profile.name, email: profile.email })
      .then((response) => {
        console.log('User data updated successfully:', response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto'
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <DenseAppBar />
      <div style={containerStyle}>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleInputChange} />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Update Profile</button>
          </form>
        ) : (
          <>
            <img src={imagePreviewUrl || defaultProfilePic} alt="Profile" style={{ maxWidth: '50%', height: 'auto' }} />
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
