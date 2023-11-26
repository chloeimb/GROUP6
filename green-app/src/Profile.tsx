// Profile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DenseAppBar from './Navigation/topbar';
import defaultProfilePic from './images/defaultProfilePic.png';
import backgroundImage from './images/lightcolorbackground.png';

type UserProfile = {
  name: string;
  email: string;
  bio: string;
  age: number;
  gender: string;
  // Add other profile fields as needed
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: '',
    age: 0,
    gender: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    // You can replace this with your actual logic to fetch user data
    // For now, I'm using a dummy user object
    setProfile({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      age: 25,
      gender: 'Male',
    });
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
    axios
      .post(apiUrl, { ...profile, image: profileImage })
      .then((response) => {
        console.log('User data updated successfully:', response.data);
        setEditMode(false); // Switch back to display mode after successful update
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: 'auto',
    color: 'white',
    size: '30px',
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', fontSize: '50px' }}>
      <DenseAppBar />
      <div style={containerStyle}>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleInputChange} />
            <input type="text" name="bio" placeholder="Bio" value={profile.bio} onChange={handleInputChange} />
            <input type="number" name="age" placeholder="Age" value={profile.age} onChange={handleInputChange} />
            <input type="text" name="gender" placeholder="Gender" value={profile.gender} onChange={handleInputChange} />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Update Profile</button>
          </form>
        ) : (
          <>
            <img src={imagePreviewUrl || defaultProfilePic} alt="Profile" style={{ maxWidth: '50%', height: 'auto' }} />
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
