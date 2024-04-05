import React from 'react';

import './Button.css'; // Import CSS file

const Button = ({ label, onClick, link, className }) => {
  
  return (
    <button className={className} onClick={onClick}>
      <a href={link} style={{ textDecoration: 'none', color: 'inherit' }}>{label}</a>
    </button>
  );
};

export default Button;
