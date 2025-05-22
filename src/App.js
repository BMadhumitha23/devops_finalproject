import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import './App.css';

const App = () => {
    const [user, setUser] = useState({
        name: '',
        age: '',
        email: '',
        bio: '',
        avatar: ''
    });

    const [allUsers, setAllUsers] = useState([]); // 🆕 State to store all users

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', user);
            alert('Profile saved successfully!');
            setUser({
                name: '',
                age: '',
                email: '',
                bio: '',
                avatar: ''
            }); // Clear the form
            fetchUsers(); // Refresh users after submit
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile.');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setAllUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Load users when page loads
    }, []);

    return (
        <div className="container">
            <div className="form-container">
                <h2>Enter Your Profile Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={user.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bio:</label>
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Avatar URL:</label>
                        <input
                            type="text"
                            name="avatar"
                            value={user.avatar}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="submit-button">Save Profile</button>
                </form>
            </div>

            
            <div className="users-list">
                {allUsers.map((u) => (
                    <UserProfile
                        key={u._id}
                        name={u.name}
                        age={u.age}
                        email={u.email}
                        bio={u.bio}
                        avatar={u.avatar}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
