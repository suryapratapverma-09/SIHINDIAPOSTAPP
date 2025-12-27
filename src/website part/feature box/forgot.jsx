import React from 'react';
import { Link } from 'react-router-dom';
const Forgot = () => {
  return (
    <div>
    <div className='head'>
        <Link to="../"><img src=".././public/heading logo/indiapost_logo_L.png" alt="india post logo" /></Link>
        <img src="public/heading logo/National-Emblem.png" alt="national emblem" />
    </div>
    <div className='body'>
        <div>
            <form>

            </form>
        </div>
    </div>
    <div className='footer'>
        <div id='footer1'>
            <Link to="../">Home</Link>
            <Link to="https://www.indiapost.gov.in/VAS/Pages/CustomerSupport/Help.aspx">Help</Link>
            <Link to="https://www.indiapost.gov.in/VAS/pages/sitemap.aspx">Sitemap</Link>
            <Link to="https://www.indiapost.gov.in/VAS/Pages/content/ContactUs.aspx">Contact Us</Link>
        </div>
        <div id="footer2">
            <strong>© Content Owned by Department of Posts, Ministry of Communications, Government of India</strong>
        </div>
    </div>
</div>
  )
}

export default Forgot;