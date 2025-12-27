import React from 'react';
import Signin from './signin';
import Search from './search';
import Crousel from './crousel';
import '../../Css part/header css/header.css';

const Head = () => {
  return (
    <div className='mainheading'>
        <div className='navigationbar'>
            <div className='leftside'>
              <div>
                <img className="navlogo" src=".././public/heading logo/login-avatar.png" alt="login-avatar" />
              </div>
               <Signin/>
            </div>

            <div className='rightside'>
              <img className="navlogo" src=".././public/heading logo/skipToMainContent.png" alt="skip to main content" />
              <img className="navlogo" src=".././public/heading logo/increaseFontSize.png" alt="increse font size" />
              <a href="https://www.indiapost.gov.in/VAS/Pages/Content/Screenreader.aspx"><img className="navlogo" src=".././public/heading logo/accessible-icon.png" alt="screen reader" /></a>
              <img className="navlogo hindi" src=".././public/heading logo/hindi.png" alt="india post home hindi"/>
              <a href="https://www.indiapost.gov.in/VAS/pages/sitemap.aspx"><img className="navlogo" src=".././public/heading logo/siteMap.png" alt="site map" /></a>
              <Search/>
            </div>
        </div>
         
        <div className='logo'>
          <div className='indiapost'>
            <img className="postlogoimage" src=".././public/heading logo/indiapost_logo_L.png" alt="india post logo" />
          </div> 
          <div className='indianlogo'>
            <img className="logoimage logo1" src=".././public/heading logo/G20.png" alt="g20 logo" />
            <img className="logoimage logo1" src=".././public/heading logo/ajadi.png" alt="75 ajadi logo" />
            <img className="logoimage" src=".././public/heading logo/National-Emblem.png" alt="national-emblem" />
          </div>
        </div>
        <Crousel/>
    </div>
  )
}

export default Head;