import React, { useState } from 'react';
import '../../Css part/body css/collapse.css';

const Collapse = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  return (
    <div className="container">
      <button id="toggleButton" className="toggle-button" onClick={toggleMenu}>
        Menu
      </button>
      <div id="menu" className={`menu ${isOpen ? 'open' : ''}`}>
        <ul className="menu-list">
          <li>About Us</li>
          <li><a href="https://www.indiapost.gov.in/VAS/pages/PMDashboard.aspx">Performance Dashboard</a></li>
          <li>Mails & Stamps</li>
          <li>Banking & Remittance</li>
          <li><a href="https://www.indiapost.gov.in/Financial/Pages/Content/NPS.aspx">NPS</a></li>
          <li>Insurance</li>
          <li>Business & Ecommerce</li>
          <li>Retail & Service</li>
          <li><a href="https://www.indiapost.gov.in/MBE/Pages/Content/holy_blessing.aspx">Prasadam (Holy Blessing)</a></li>
          <li>Tools & Help</li>
        </ul>
      </div>
    </div>
  );
};

export default Collapse;
