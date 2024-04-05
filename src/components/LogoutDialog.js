// LogoutDialog.js
import React from 'react';
import './LogoutDialog.css'; // Import the CSS file for the logout dialog

const LogoutDialog = ({ handleLogout, handleClose }) => {
  const handleCancel = () => {
    // Close the logout dialog without logging out
    handleClose();
  };

  const handleLogoutClick = () => {
    // Perform logout action
    handleLogout();
    handleClose();
  };

  return (
    <div className="logout-dialog">
      <div className="logout-dialog-content">
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="logout-btn-dialog" onClick={handleLogoutClick}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
