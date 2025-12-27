import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../../Css part/header css/login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {         
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            window.alert("All fields are required!");
            return;
        }
        // Send POST request to backend
        
        axios.post('http://localhost:5000/submit',formData)
         .then((response) => {
            // Handle the response here, e.g., redirect or update UI
            if(response.data.message==="login successful")
            {
                navigate("/clicknbook")
            }
            else
            {
                setResponse(response.data.message);
            }
            
         })
         .catch((error) => {
            console.error('Error submitting form:', error);
            if (error.response) {
               console.error('Response data:', error.response.data);
               console.error('Status:', error.response.status);
            }
            setResponse('Error submitting form');
         });
    };

  return (
    <div>
        <div className='head'>
            <Link to="../"><img src=".././public/heading logo/indiapost_logo_L.png" alt="india post logo" /></Link>
            <img src="public/heading logo/National-Emblem.png" alt="national emblem" />
        </div>
        <div className='body'>
            <h1>Sign In</h1>
            <div className='information'>
                <h1>Sign in to your India Post account</h1>
                <span>To access a range of services:</span>
                <ul className='note'>
                    <li className='disclamer'>
                        <h6>Book Mails</h6>
                    </li>
                    <strong>Book to send your Letter, Parcel, Documents within India, manage your mails and view transaction<br/>history</strong>
                    
                    <li className='disclamer'>
                        <h6>Business solutions</h6>
                    </li>
                    <strong>Avail our business mailing services, book bulk mail, request a pickup, manage your account and track delivery status</strong>
                    
                    <li className='disclamer'>
                        <h6>Philately</h6>
                    </li>
                    <strong>Open and manage philately accounts</strong>
                </ul>
            </div>
            <div>
                <form onSubmit={handleSubmit}  >
                    <div>
                        <h1>Sign in</h1>
                    </div>
                    <div>
                        <label htmlFor="email">User ID:
                        <input type="email" name="email" id="email"  value={formData.email} onChange={handleChange}/>
                        </label>
                        <label htmlFor="password">Password
                        <input type="password" name="password" id="password" value={formData.password}onChange={handleChange}/>
                        </label>
                        <div>
                            <input type="submit" value="Sign In" />
                            <Link to="/forgotpassword">Forgot Password</Link>
                            {response && <p>{response}</p>}
                        </div>
                    </div>
                    <div>
                        <h1>Don't have an account?</h1>
                    </div>
                    <Link to="/newuser">Create a new account</Link>
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

export default Login;