import React from 'react';
import './UserProfile.css';

const UserProfile = (props) => {
    const { name, age, email, bio, avatar } = props;

    return (
        <div className="profile-container">
            <img src={avatar} alt={`${name}'s avatar`} className="profile-avatar" />
            <h1 className="profile-name">{name}</h1>

            <div className="detail-box"><strong>Name:</strong> {name}</div>
            <div className="detail-box"><strong>Age:</strong> {age}</div>
            <div className="detail-box"><strong>Bio:</strong> {bio}</div>
            <div className="detail-box"><strong>Email:</strong> {email}</div>

        </div>
    );
};

export default UserProfile;
