import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { MenuItems } from './MenuItems'; // Assuming you have a MenuItems file exporting the array
import Button from './Button'; // Assuming you have a Button component
import Cookies from 'js-cookie'; // Import the Cookies module
import LogoutPopover from './LogoutPopover'; // Import the logout popover component
import LogoutDialog from './LogoutDialog'; // Import the logout dialog component

const Navbar = () => {
  const isLoggedIn = Cookies.get('loggedIn');
  const username = Cookies.get('username');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLogoutPopover, setShowLogoutPopover] = useState(false);

  const handleLogout = () => {
    Cookies.remove('loggedIn');
    Cookies.remove('username');
    window.location.reload(); // Reload the page after logout
  };

  const handlePopoverToggle = () => {
    setShowLogoutPopover(!showLogoutPopover); // Toggle the logout popover
  };

  const handleDialogLogout = () => {
    handleLogout(); // Logout the user
    setShowLogoutDialog(false); // Close the logout dialog
  };

  const handleDialogCancel = () => {
    setShowLogoutDialog(false); // Close the logout dialog without logging out
  };

  return (
    <nav className='NavbarItems'>
      <h1 className='navbar-logo'>Furry Family Finds</h1>
      <ul className='nav-menu'>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              className={`${item.cName}`}
              activeClassName='active'
              to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </NavLink>
          </li>
        ))}
        {isLoggedIn ? (
          <li>
            <div className="user-icon" onClick={handlePopoverToggle}>
              <i className="fa-solid fa-user"></i> {username.split(' ')[0]} {/* Display only the first name */}
            </div>
          </li>
        ) : (
          <li><Button label="Login" link="/login" className="login-btn"/></li>
        )}
      </ul>
      {showLogoutDialog && <LogoutDialog handleLogout={handleDialogLogout} handleCancel={handleDialogCancel} />}
      {showLogoutPopover && <LogoutPopover handleLogout={handleLogout} />}
    </nav>
  );
};

export default Navbar;
