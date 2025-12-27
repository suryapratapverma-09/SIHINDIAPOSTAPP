import React from 'react'
import '../../Css part/body css/body.css'
import Collapse from './collapse'
import Infobox from './infobox'
import Track from './track'
import { Link } from 'react-router-dom'
const Body = () => {
  return (
    <div className='mainbody'>
        <div className='partone'>
            <Collapse/>
        </div>
        <div className='parttwo'>
            <div className='one'>
                <div className='tracking'>
                    <div className='trackhead'>
                        <img src=".././public/body logo/order-tracking.png" alt="tracking parcel" />
                        <h6>Track N Trace</h6>
                    </div>
                    <div className='trackinginfo'>
                        <Track/>
                        <div className='erecipt'>
                            <img id="track" src=".././public/body logo/Track.png" alt="tracking Logo" />
                            <a href="https://mis.cept.gov.in/DarpaneReceipts/">e-Receipt</a>
                            {/* booking status part */}
                        </div>
                    </div>
                </div>
                <div className='feature'>
                    <div className='featureone'>
                        <div className='basic'><a href="https://www.indiapost.gov.in/VAS/Pages/CalculatePostage.aspx"><img src=".././public/body logo/pngwing.com.png" alt="calculator"/></a><h6>Calculate<br/>Postage</h6></div>
                        <div className='basic'><a href="https://www.indiapost.gov.in/vas/pages/findpincode.aspx"><img src=".././public/body logo/pngwing.com (1).png" alt="pincode"/></a><h6>Find Pincode</h6></div>
                        <div className='basic'><Link to="login"><img src=".././public/body logo/vecteezy_computer-mouse-click-png-transparent_9408692.png" alt="click and book"/></Link><h6>Click n Book</h6></div>
                        <div className='basic'><a href="https://www.indiapost.gov.in/Philately/Pages/Content/Buy-Stamp.aspx"><img src=".././public/body logo/stamp.jpg" alt="stamp"/></a><h6>Buy Stamps</h6></div>
                        <div className='basic'><a href="https://www.indiapost.gov.in/vas/pages/LocatePostOffices.aspx"><img src=".././public/body logo/pngwing.com (2).png" alt="post office"/></a><h6>Locate Post<br/>Office</h6></div>
                        <div className='basic'><img src=".././public/body logo/CabinetMinister.jpg" alt="" /><strong><a href="https://www.indiapost.gov.in/VAS/Pages/AboutUs/CabinetMinister.aspx">MOC, Shri<br/>Jyotiraditya M.<br/>Scindia</a></strong></div>
                    </div>
                    <div className='featuretwo'>
                        <div className='basic'><a href="https://www.dakkarmayogi.gov.in/doptrg/"><img src=".././public/body logo/DKP.png" alt="" /></a><h6>Dak Karmayogi<br/>Portal</h6></div>
                        <div className='basic'><a href="https://dnk.cept.gov.in/customers.web/"><img src=".././public/body logo/DNK.png" alt="" /></a><h6>Dak Ghar Niryat<br/>Portal</h6></div>
                        <div className='basic'><a href="https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Saving-Schemes.aspx"><img src=".././public/body logo/Screenshot 2024-11-14 150106.png" alt="" /></a><h6>Post Office<br/>Savings Bank</h6></div>
                        <div className='basic'><a href="https://www.ippbonline.com/"><img src=".././public/body logo/india post payment bank.jpeg" alt="india post payment bank" /></a><h6>India Post<br/>Payments Bank</h6></div>
                        <div className='basic'><a href="https://pli.indiapost.gov.in/CustomerPortal/Home.action"><img src=".././public/body logo/Screenshot 2024-11-14 150155.png" alt="" /></a><h6>Postal Life<br/>Insurance</h6></div>
                        <div className='basic'><img src="public/body logo/MinisterOfState.jpg" alt="" /><strong><a href="https://www.indiapost.gov.in/VAS/Pages/AboutUs/MinisterOfState.aspx">MOS, Dr. Chandra<br/>Sekhar<br/>Pemmasani</a></strong></div>
                    </div>
                </div>
            </div>
            <div className='two'>
                <div className='informationone'>
                    <div className='calling'>
                        <img src=".././public/body logo/telephone.png" alt="telephone" />
                        <h6 id="heading1">Toll Free Enquiry Helpline:</h6>
                    </div>
                    <div className='infoaboutcalling'>
                        <strong>18002666868</strong>
                        <h6>9:00 AM - 6:00 PM</h6>
                        <p>(Except Sundays & Gazetted Holidays)</p>
                        <strong>IVRS facility is available 24*7*365</strong>
                        <strong><a href="https://www.indiapost.gov.in/VAS/Pages/ComplaintRegistration.aspx">Register your complaint</a></strong>
                    </div>
                </div>
                <div className='informationtwo'>
                    <Infobox/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body;