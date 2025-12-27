import React from 'react';
import '../../Css part/header css/popover.css';

const Popover = () => {
  return (
    <div className="popover">
      <button 
        className="popover__button" 
        aria-label="Popover trigger" 
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img id="quesmark"src=".././public/heading logo/icon-help-circled.png" alt="question mark" />
      </button>
      <div className="popover__content">
        <p>If you have registered under
            any of the following 
            category, you need to sign-
            in as registered user 
            Retail 
            Corporate 
            OSA (Outsourcing Agents)
            Franchisee
        </p>
      </div>
    </div>
  );
};

export default Popover;
