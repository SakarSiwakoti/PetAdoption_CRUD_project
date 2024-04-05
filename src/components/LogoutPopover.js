// LogoutPopover.js
import React, { useState } from 'react';
import LogoutDialog from './LogoutDialog'; // Import the LogoutDialog component
import './LogouPopover.css';

const LogoutPopover = ({ handleLogout }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="logout-popover">
      <div className="logout-option" onClick={handleLogoutClick}>
      <i class="fa-solid fa-right-from-bracket"></i> Logout
      </div>
      {showDialog && <LogoutDialog handleLogout={handleLogout} handleClose={handleCloseDialog} />}
    </div>
  );
};

export default LogoutPopover;
