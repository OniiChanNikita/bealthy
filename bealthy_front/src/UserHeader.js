// UserHeader.js
import React from 'react';

const UserHeader = ({ username }) => {
  return (
    <div className="user-header">
      <h2>Welcome, {username}!</h2>
    </div>
  );
}

export default UserHeader;