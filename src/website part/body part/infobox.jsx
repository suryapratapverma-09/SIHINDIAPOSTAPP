import React, { useState } from 'react';
import '../../Css part/body css/infobox.css';

const Infobox = () => {
  // State to track which box is selected
  const [selectedBox, setSelectedBox] = useState(1);

  // Handle button clicks to show corresponding box
  const handleButtonClick = (boxNumber) => {
    setSelectedBox(boxNumber); // Set the selected box
  };

  return (
    <div className='info'>
      {/* Button group to toggle boxes */}
      <div className="button-group">
        <button
          className="tab-button"
          onClick={() => handleButtonClick(1)}
        >
          News & Updates
        </button>
        <button
          className="tab-button"
          onClick={() => handleButtonClick(2)}
        >
          Tenders
        </button>
        <button
          className="tab-button"
          onClick={() => handleButtonClick(3)}
        >
          Notifications
        </button>
        <button
          className="tab-button"
          onClick={() => handleButtonClick(4)}
        >
          Recruitment
        </button>
      </div>

      {/* Conditional rendering of boxes */}
      <div className={`box ${selectedBox === 1 ? 'show' : ''}`} id="box1">
        <ul>
          <li><a href="#">Link 1.1</a></li>
          <li><a href="#">Link 1.2</a></li>
          <li><a href="#">Link 1.3</a></li>
        </ul>
      </div>
      <div className={`box ${selectedBox === 2 ? 'show' : ''}`} id="box2">
        <ul>
          <li><a href="#">Link 2.1</a></li>
          <li><a href="#">Link 2.2</a></li>
          <li><a href="#">Link 2.3</a></li>
        </ul>
      </div>
      <div className={`box ${selectedBox === 3 ? 'show' : ''}`} id="box3">
        <ul>
          <li><a href="#">Link 3.1</a></li>
          <li><a href="#">Link 3.2</a></li>
          <li><a href="#">Link 3.3</a></li>
        </ul>
      </div>
      <div className={`box ${selectedBox === 4 ? 'show' : ''}`} id="box4">
        <ul>
          <li><a href="#">Link 4.1</a></li>
          <li><a href="#">Link 4.2</a></li>
          <li><a href="#">Link 4.3</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Infobox;
