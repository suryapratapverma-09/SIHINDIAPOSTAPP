import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Newuser = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    gender: '',
    state: '',
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleBlur = (e) => {
    const { name, value } = e.target;
      axios
        .post('http://localhost:5000/checker', { input: value, name: name }) // Send value on blur
        .then((response) => {
          setResponse(response.data.message); // Update response with backend data
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          setResponse("Some error found!"); // Set a user-friendly error message
        });
  };
  const validateForm = () => {
    const newErrors = {};

    // Name validation: Ensure name only contains alphabets and spaces
    if (!formData.name.trim()) {
        newErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        newErrors.name = 'Name can only contain alphabets and spaces.';
    }

    // Phone validation: Must be 10 digits and start with valid Indian mobile prefixes
    if (!formData.phone) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be a valid 10-digit Indian number.';
    }

    // Email validation: Ensure email is valid and follows common formats
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
    } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
        newErrors.email = 'Invalid email format.';
    }

    // Date of Birth validation: Ensure the user is at least 18 years old
    if (!formData.dob) {
        newErrors.dob = 'Date of Birth is required.';
    }  
    // Password validation: Must have at least one uppercase, one lowercase, one number, and one special character
    if (!formData.password) {
      newErrors.password = 'Password is required.';
  } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
  }  

    // Gender validation: Ensure a gender is selected
    if (!formData.gender) {
        newErrors.gender = 'Please select a gender.';
    }

    // State validation: Ensure a state is selected
    if (!formData.state) {
        newErrors.state = 'Please select your state.';
    }

    return newErrors;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Simulate form submission (replace with actual API call)
      console.log('Form Submitted:', formData);
      setSubmitMessage('Form submitted successfully!');
      axios
          .post('http://localhost:5000/usersubmit', formData)
          .then((/*response*/) => {
            // setResponse(response.data.message); // Show the response from backend
            navigate('/');
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            setResponse('Error submitting form');
          });
      setFormData({
        name: '',
        phone: '',
        email: '',
        dob: '',
        password: '',
        gender: '',
        state: '',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitMessage('');
    }
  };

  const formContainerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  };

  return (
    <div>
      <div className="head">
        <Link to="../">
          <img src=".././public/heading logo/indiapost_logo_L.png" alt="India Post Logo" />
        </Link>
        <img src="public/heading logo/National-Emblem.png" alt="National Emblem" />
      </div>
      <div className="body">
        <div style={formContainerStyle}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>User Registration</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onBlur={handleBlur} onChange={handleChange} required />
              {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
            </div>
            {response && <div>{response}</div>}
            {/* OTP BOX */}
            <div style={{ marginBottom: '10px' }}>
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onBlur={handleBlur}
                placeholder="Enter OTP"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email ID:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
              {errors.dob && <div style={errorStyle}>{errors.dob}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Gender:</label>
              <div>
                <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'}onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</label>
                <label><input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} /> Other</label>
              </div>
              {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="state">State:</label>
              <select id="state" name="state" value={formData.state} onChange={handleChange} required>
              <option value="" disabled selected>Select your state</option>
                <option value="andhra-pradesh">Andhra Pradesh</option>
                <option value="arunachal-pradesh">Arunachal Pradesh</option>
                <option value="assam">Assam</option>
                <option value="bihar">Bihar</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="goa">Goa</option>
                <option value="gujarat">Gujarat</option>
                <option value="haryana">Haryana</option>
                <option value="himachal-pradesh">Himachal Pradesh</option>
                <option value="jharkhand">Jharkhand</option>
                <option value="karnataka">Karnataka</option>
                <option value="kerala">Kerala</option>
                <option value="madhya-pradesh">Madhya Pradesh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="manipur">Manipur</option>
                <option value="meghalaya">Meghalaya</option>
                <option value="mizoram">Mizoram</option>
                <option value="nagaland">Nagaland</option>
                <option value="odisha">Odisha</option>
                <option value="punjab">Punjab</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="sikkim">Sikkim</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="telangana">Telangana</option>
                <option value="tripura">Tripura</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="west-bengal">West Bengal</option>
              </select>
              {errors.state && <div style={errorStyle}>{errors.state}</div>}
            </div>

            <button type="submit">Submit</button>
          </form>
          {submitMessage && <div style={{ color: 'green', marginTop: '10px' }}>{submitMessage}</div>}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div id="footer1">
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
  );
};

export default Newuser;
