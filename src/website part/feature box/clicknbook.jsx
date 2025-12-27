import React, {useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const TimeSlots = () => {
  // State to store available time slots
  const [availableSlots, setAvailableSlots] = useState([]);
  
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_available_slots");
        console.log(response.data.available_slots); 
        setAvailableSlots(response.data.available_slots); // Update state with available slots
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };
    
    fetchTimeSlots(); // Call the async function when the component mounts
  }, []); // Empty dependency array to run once when the component mounts
  
  return (
    <div>
      <select>
        <option value="" disabled>Select delivery time</option>
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))
        ) : (
          <option value="" disabled>No available slots</option>
        )}
      </select>
    </div>
  );
};




const Clicknbook = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    senderPincode: "",
    senderContact: "",
    senderEmail: "",
    recipientName: "",
    recipientAddress: "",
    recipientPincode: "",
    recipientContact: "",
    recipientEmail: "",
    deliveryTime:"",
    neighbour:"",
    serviceType: "",
    parcelWeight: "",
    parcelDescription: "",
    parcelValue: "",
    additionalServices: [],
    pickupDate: "",
    pickupTime: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [response,setResponse]= useState('')



  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    if (name === "recipientContact" && value.trim()) {
      axios
        .post('http://localhost:5000/realtimesubmit', { input: value }) // Send value on blur
        .then((response) => {
          setResponse(response?.data?.most_successful_time_slot); // Update response with backend data
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          setResponse("Some error found!"); // Set a user-friendly error message
        });
    } else if (name === "recipientContact") {
      setResponse("Please fill out this field."); // Show a message if the field is empty
    }
  };  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedServices = checked
        ? [...formData.additionalServices, value]
        : formData.additionalServices.filter((service) => service !== value);
      setFormData({ ...formData, additionalServices: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Sender's Information Validation
    if (!formData.senderName.trim()) newErrors.senderName = "Sender's name is required.";
    if (!formData.senderAddress.trim()) newErrors.senderAddress = "Sender's address is required.";
    if (!formData.senderPincode.match(/^\d{6}$/))
      newErrors.senderPincode = "Enter a valid 6-digit PIN code.";
    if (!formData.senderContact.match(/^\d{10}$/))
      newErrors.senderContact = "Enter a valid 10-digit mobile number.";
    if (formData.senderEmail && !formData.senderEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.senderEmail = "Enter a valid email address.";
  
    // Recipient's Information Validation
    if (!formData.recipientName.trim()) newErrors.recipientName = "Recipient's name is required.";
    if (!formData.recipientAddress.trim())
      newErrors.recipientAddress = "Recipient's address is required.";
    if (!formData.recipientPincode.match(/^\d{6}$/))
      newErrors.recipientPincode = "Enter a valid 6-digit PIN code.";
    if (!formData.recipientContact.match(/^\d{10}$/))
      newErrors.recipientContact = "Enter a valid 10-digit mobile number.";
    if (formData.recipientEmail && !formData.recipientEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.recipientEmail = "Enter a valid email address.";
  
    // Parcel Details Validation
    if (!formData.serviceType) newErrors.serviceType = "Please select a service type.";
    if (!formData.parcelWeight || formData.parcelWeight <= 0)
      newErrors.parcelWeight = "Enter a valid parcel weight.";
    if (!formData.parcelDescription.trim())
      newErrors.parcelDescription = "Parcel description is required.";
    if (!formData.parcelValue || formData.parcelValue <= 0)
      newErrors.parcelValue = "Enter a valid parcel value.";

    // delivery Information Validation

    if (!formData.deliveryTime) newErrors.deliveryTime = "Select a preferred delivery time.";
  
    // Pickup Information Validation
    if (!formData.pickupDate) newErrors.pickupDate = "Select a preferred pickup date.";
    else {
      const pickupDate = new Date(formData.pickupDate);
      const today = new Date();
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(today.getDate() + 2); // Set to the day after tomorrow
      
      // Ensure the selected date is not before the day after tomorrow
      if (pickupDate < dayAfterTomorrow) {
        newErrors.pickupDate = "Pickup date must be at least the day after tomorrow.";
      }
  
      const day = pickupDate.getDay();
      // Check if the pickup date is a Saturday (6) or Sunday (0)
      if (day === 0) {
        newErrors.pickupDate = "Pickup date cannot be on a Sunday.";
      }
    }
  
    if (!formData.pickupTime) newErrors.pickupTime = "Select a preferred pickup time.";
  
    // Payment Method Validation
    if (!formData.paymentMethod) newErrors.paymentMethod = "Please select a payment method.";
  
    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setFormSubmitted(true);
      console.log("Form Data Submitted:", formData);
      axios
          .post('http://localhost:5000/clicknbooksubmit', formData)
          .then((/*response*/) => {
            // setResponse(response.data.message); // Show the response from backend
            navigate('/');
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            // setResponse('Error submitting form');
          });
      // Reset form data after submission
      setFormData({
        senderName: "",
        senderAddress: "",
        senderPincode: "",
        senderContact: "",
        senderEmail: "",
        recipientName: "",
        recipientAddress: "",
        recipientPincode: "",
        recipientContact: "",
        recipientEmail: "",
        deliveryTime:"",
        neighbour:"",
        serviceType: "",
        parcelWeight: "",
        parcelDescription: "",
        parcelValue: "",
        additionalServices: [],
        pickupDate: "",
        pickupTime: "",
        paymentMethod: "",
      });
    } else {
      setErrors(validationErrors);
      setFormSubmitted(false);
    }
    
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  };

  const submitStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  };
  return (
    <div>
      <div className='head'>
        <Link to="../"><img src=".././public/heading logo/indiapost_logo_L.png" alt="india post logo" /></Link>
        <img src="public/heading logo/National-Emblem.png" alt="national emblem" />
    </div>
    <div className='body'>
        <h1 style={{ textAlign: "center" }}>India Post Click-N-Book</h1>
        {formSubmitted && (
          <p style={{ color: "green", textAlign: "center" }}>
            Form successfully submitted!
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
  {/* Sender's Information */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Sender's Full Name:</label>
    <input
      type="text"
      name="senderName"
      value={formData.senderName}
      onChange={handleChange}
      placeholder="Enter sender's full name"
      style={inputStyle}
    />
    {errors.senderName && <p style={errorStyle}>{errors.senderName}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Sender's Address:</label>
    <textarea
      name="senderAddress"
      value={formData.senderAddress}
      onChange={handleChange}
      placeholder="Enter sender's address"
      style={inputStyle}
    />
    {errors.senderAddress && <p style={errorStyle}>{errors.senderAddress}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Sender's PIN Code:</label>
    <input
      type="text"
      name="senderPincode"
      value={formData.senderPincode}
      onChange={handleChange}
      placeholder="Enter 6-digit PIN code"
      style={inputStyle}
    />
    {errors.senderPincode && <p style={errorStyle}>{errors.senderPincode}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Sender's Contact Number:</label>
    <input
      type="tel"
      name="senderContact"
      value={formData.senderContact}
      onChange={handleChange}
      placeholder="Enter 10-digit mobile number"
      style={inputStyle}
    />
    {errors.senderContact && <p style={errorStyle}>{errors.senderContact}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Sender's Email ID:</label>
    <input
      type="email"
      name="senderEmail"
      value={formData.senderEmail}
      onChange={handleChange}
      placeholder="Enter sender's email"
      style={inputStyle}
    />
    {errors.senderEmail && <p style={errorStyle}>{errors.senderEmail}</p>}
  </div>

  {/* Recipient's Information */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Recipient's Full Name:</label>
    <input
      type="text"
      name="recipientName"
      value={formData.recipientName}
      onChange={handleChange}
      placeholder="Enter recipient's full name"
      style={inputStyle}
    />
    {errors.recipientName && <p style={errorStyle}>{errors.recipientName}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Recipient's Address:</label>
    <textarea
      name="recipientAddress"
      value={formData.recipientAddress}
      onChange={handleChange}
      placeholder="Enter recipient's complete address"
      style={inputStyle}
    />
    {errors.recipientAddress && <p style={errorStyle}>{errors.recipientAddress}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Recipient's PIN Code:</label>
    <input
      type="text"
      name="recipientPincode"
      value={formData.recipientPincode}
      onChange={handleChange}
      placeholder="Enter 6-digit PIN code"
      style={inputStyle}
    />
    {errors.recipientPincode && <p style={errorStyle}>{errors.recipientPincode}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Recipient's Contact Number:</label>
    <input
      type="tel"
      name="recipientContact"
      value={formData.recipientContact}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="Enter 10-digit mobile number"
      style={inputStyle}
    />
    {errors.recipientContact && <p style={errorStyle}>{errors.recipientContact}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Recipient's Email ID:</label>
    <input
      type="email"
      name="recipientEmail"
      value={formData.recipientEmail}
      onChange={handleChange}
      placeholder="Enter recipient's email"
      style={inputStyle}
    />
    {errors.recipientEmail && <p style={errorStyle}>{errors.recipientEmail}</p>}
  </div>

{/* Delivery Information */}
<div style={{ marginBottom: '10px' }}>
  <label style={{ fontWeight: 'bold' }}>Preferred Delivery Time:</label>
  {/* <select
    name="deliveryTime"
    value={formData.deliveryTime}
    onChange={handleChange}
    style={inputStyle}
  >
  <Time_slots/>
    <option value="" disabled>Select delivery time</option>
    <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
    <option value="10:00-11:00">10:00 AM - 11:00 PM</option>
    <option value="11:00-12:00">11:00 PM - 12:00 PM</option>
    <option value="12:00-13:00">12:00 PM - 13:00 PM</option>
    <option value="13:00-14:00">13:00 PM - 14:00 PM</option>
    <option value="14:00-15:00">14:00 PM - 15:00 PM</option>
    <option value="15:00-16:00">15:00 PM - 16:00 PM</option>
    <option value="16:00-17:00">16:00 PM - 17:00 PM</option>
  </select> */}
  <TimeSlots />
  {response && <p> Preferred Time : {response}</p>}
  {errors.deliveryTime && <p style={errorStyle}>{errors.deliveryTime}</p>}
</div>


<div style={{ marginBottom: '10px' }}>
  <label style={{ fontWeight: 'bold' }}>Leave Parcel With Neighbour:</label>
  <select
    name="neighbour"
    value={formData.neighbour}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="" disabled>Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
  {errors.neighbour && <p style={errorStyle}>{errors.neighbour}</p>}
</div>

  {/* Parcel Details */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Type of Service:</label>
    <select
      name="serviceType"
      value={formData.serviceType}
      onChange={handleChange}
      style={inputStyle}
    >
      <option value="" disabled>Select service type</option>
      <option value="speed-post">Speed Post</option>
      <option value="registered-post">Registered Post</option>
      <option value="parcel-domestic">Parcel (Domestic)</option>
      <option value="parcel-international">Parcel (International)</option>
    </select>
    {errors.serviceType && <p style={errorStyle}>{errors.serviceType}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Parcel Weight (kg):</label>
    <input
      type="number"
      name="parcelWeight"
      value={formData.parcelWeight}
      onChange={handleChange}
      placeholder="Enter parcel weight"
      style={inputStyle}
      step="0.01"
    />
    {errors.parcelWeight && <p style={errorStyle}>{errors.parcelWeight}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Description of Contents:</label>
    <textarea
      name="parcelDescription"
      value={formData.parcelDescription}
      onChange={handleChange}
      placeholder="Enter description of parcel contents"
      style={inputStyle}
    />
    {errors.parcelDescription && <p style={errorStyle}>{errors.parcelDescription}</p>}
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Value of Parcel (INR):</label>
    <input
      type="number"
      name="parcelValue"
      value={formData.parcelValue}
      onChange={handleChange}
      placeholder="Enter parcel value for insurance"
      style={inputStyle}
    />
    {errors.parcelValue && <p style={errorStyle}>{errors.parcelValue}</p>}
  </div>

  {/* Additional Services */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Additional Services:</label>
    <div>
      <label>
        <input
          type="checkbox"
          name="additionalServices"
          value="fragile"
          checked={formData.additionalServices.includes("fragile")}
          onChange={handleChange}
        />{" "}
        Fragile
      </label>
      <label>
        <input
          type="checkbox"
          name="additionalServices"
          value="insurance"
          checked={formData.additionalServices.includes("insurance")}
          onChange={handleChange}
        />{" "}
        Insurance
      </label>
      <label>
        <input
          type="checkbox"
          name="additionalServices"
          value="acknowledgment"
          checked={formData.additionalServices.includes("acknowledgment")}
          onChange={handleChange}
        />{" "}
        Acknowledgment Due
      </label>
    </div>
  </div>

  {/* Pickup Information */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Preferred Pickup Date:</label>
    <input
      type="date"
      name="pickupDate"
      value={formData.pickupDate}
      onChange={handleChange}
      style={inputStyle}
    />
    {errors.pickupDate && <p style={errorStyle}>{errors.pickupDate}</p>}
  </div>
   {/* Pickup Information */}
<div style={{ marginBottom: '10px' }}>
  <label style={{ fontWeight: 'bold' }}>Preferred Pickup Time:</label>
  {/* <select
    name="pickupTime"
    value={formData.pickupTime}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="" disabled>Select pickup time</option>
    <option value="09:00-10:00">09:00 - 10:00</option>
    <option value="10:00-11:00">10:00 - 11:00</option>
    <option value="11:00-12:00">11:00 - 12:00</option>
    <option value="12:00-13:00">12:00 - 13:00</option>
    <option value="13:00-14:00">13:00 - 14:00</option>
    <option value="14:00-15:00">14:00 - 15:00</option>
    <option value="15:00-16:00">15:00 - 16:00</option>
    <option value="16:00-17:00">16:00 - 17:00</option>
  </select> */}
  <TimeSlots />
  {errors.pickupTime && <p style={errorStyle}>{errors.pickupTime}</p>}
</div>

  {/* Payment Method */}
  <div style={{ marginBottom: '10px' }}>
    <label style={{ fontWeight: 'bold' }}>Payment Method:</label>
    <select
      name="paymentMethod"
      value={formData.paymentMethod}
      onChange={handleChange}
      style={inputStyle}
    >
      <option value="" disabled>Select payment method</option>
      <option value="prepaid">Prepaid (Online Payment)</option>
      <option value="cod">Cash on Delivery</option>
    </select>
    {errors.paymentMethod && <p style={errorStyle}>{errors.paymentMethod}</p>}
  </div>

  <input
    type="submit"
    value="Submit"
    style={{ ...submitStyle, cursor: 'pointer', padding: '10px 20px', fontSize: '16px' }}
  />
</form>
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

export default Clicknbook