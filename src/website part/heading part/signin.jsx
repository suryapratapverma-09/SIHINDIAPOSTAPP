import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Css part/header css/signin.css';
import Popover from './popover';

const Signin = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // To track open dropdown
  const dropdownRef = useRef(null);

  const toggleDropdown = (type) => {
    setOpenDropdown((prevType) => (prevType === type ? null : type));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null); // Close dropdown when clicking outside
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button type="button" className="btn" onClick={() => toggleDropdown('signin')} aria-expanded={openDropdown === 'signin'}>
        Sign In
      </button>
      <button type="button" className="btn" onClick={() => toggleDropdown('registration')} aria-expanded={openDropdown === 'registration'}>
        Registration
      </button>

      {/* Sign In Dropdown */}
      {openDropdown === 'signin' && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <Link to="/login">Registered User</Link>
            <Popover /> 
          </div>
        </div>
      )}

      {/* Registration Dropdown */}
      {openDropdown === 'registration' && (
        <div className="dropdown-content">
          <a href="#">Retail</a>
          <a href="#">Corporate</a>
        </div>
      )}
    </div>
  );
};

export default Signin;
