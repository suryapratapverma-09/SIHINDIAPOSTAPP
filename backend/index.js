import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import LocalStrategy from 'passport-local';
import axios from "axios";
import bcrypt from "bcrypt"
import inquirer from "inquirer"
import qr from "qr-image"
import fs from "fs"
const app = express();
const PORT = 5000;

const FLASK_API_URL = 'http://127.0.0.1:5000/predict';

const saltround = 10;

const db = new pg.Pool({
   user:"postgres",
   host:"localhost",
   database:"INDIAPOST",
   password:"@123#",
   port:5432,
})

db.connect();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

app.use(session({
   secret:"userdetail",
   resave:false,
   saveUninitialized:true,
}))

app.use(passport.initialize());
app.use(passport.session());

let generatedOTP = null; // Store OTP at a scope accessible to both routes

app.post('/checker', (req, res) => {
   const { input, name } = req.body;
 
   if (name === "phone") {
     // Generate OTP
     generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
     console.log(`OTP for phone number: ${generatedOTP}`);
     res.json({ message: 'OTP sent successfully!' });
 
   } else if (name === "otp") {
     // Check OTP (compare the received input with the generated OTP)
     if (!generatedOTP) {
       return res.status(400).json({ message: 'No OTP generated' });
     }

     if (input == generatedOTP) {
       generatedOTP = null; // Reset OTP after successful verification
       res.json({ message: 'OTP verified successfully!' });
     } else {
       res.status(400).json({ message: 'Invalid OTP' });
     }
   } else {
     res.status(400).json({ message: 'Invalid request' });
   }
});

app.post('/realtimesubmit', async(req, res) => {
   // console.log(req.body.input);
   // res.json({ message: "14:00-15:00" });
   try {
      const {input} = req.body;
      console.log(input)
      // Send the data to Flask
      const flaskResponse = await axios.post('http://127.0.0.1:5000/predict',{contact_number:input});

      // Return Flask's response to the frontend
      res.json(flaskResponse?.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error communicating with Flask backend');
  }
});

function generateConsignmentNumber() {
   const prefix = "CN"; // Consignment Number prefix
   const timestamp = Date.now(); // Current timestamp in milliseconds
   const randomSequence = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
   return `${prefix}${timestamp}${randomSequence}`;
}

app.post('/clicknbooksubmit', async (req, res) => {
   console.log(req.body);
   let cnumber;
   try {
       // First, create the consignment number
       let consignmentNumber;
       let isUnique = false;

       // Generate unique consignment number
       while (!isUnique) {
           consignmentNumber = generateConsignmentNumber();
           const checkResult = await db.query("SELECT * FROM parceldetails WHERE consignmentnumber=$1", [consignmentNumber]);

           // If consignment number is unique, exit the loop
           if (checkResult.rows.length === 0) {
               isUnique = true;
               cnumber=consignmentNumber;
           }
       }

       // Insert the parcel details with the generated consignment number
       const query = `
           INSERT INTO parceldetails 
           (senderName, senderAddress, senderPincode, senderContact, senderEmail, 
           recipientName, recipientAddress, recipientPincode, recipientContact, recipientEmail, 
           deliveryTime, serviceType, parcelWeight, parcelDescription, parcelValue, 
           additionalServices, pickupDate, pickupTime, paymentMethod, consignmentnumber, neighbour) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       `;
       const values = [
           req.body.senderName, req.body.senderAddress, req.body.senderPincode, req.body.senderContact, req.body.senderEmail,
           req.body.recipientName, req.body.recipientAddress, req.body.recipientPincode, req.body.recipientContact, req.body.recipientEmail,
           req.body.deliveryTime, req.body.serviceType, req.body.parcelWeight, req.body.parcelDescription, req.body.parcelValue,
           req.body.additionalServices, req.body.pickupDate, req.body.pickupTime, req.body.paymentMethod,
           consignmentNumber, req.body.neighbour
       ];

       // Perform the insert query
       const result = await db.query(query, values);
       res.status(200).json({ message: 'Parcel details added successfully', consignmentNumber });
   } catch (error) {
       console.error('Error occurred:', error);
       res.status(500).json({ message: 'Error processing request. Please try again later.' });
   }
   const questions = [
      {
        type: 'input',
        name: 'consignmentnumber',
        message: 'What is your consignmentnumber',
      },
   ]
   const initialAnswers = {
      consignmentnumber: cnumber,
   };
   inquirer
         .prompt(questions,initialAnswers)
         .then((answers) => {
             const consignmentnumber= answers.consignmentnumber;
             var qr_svg = qr.image(consignmentnumber);
             qr_svg.pipe(fs.createWriteStream("qr_img.png"));
         })
         .catch((error) => {
         console.error('Error:', error);
       });
   
});


app.post('/usersubmit', async (req, res) => {
   console.log(req.body);
   const email = req.body.email;
   const checkresult = await db.query("SELECT * FROM userdetail WHERE  email=$1",[email]);
   if(checkresult.rowCount.length>0)
   {
      res.json({message:"email already exist"});
   }
   else{
      const password = req.body.password;
      bcrypt.hash(password, saltround, (err,hash)=>{
         if(err){
            console.log("error in doing hashing:",err);
         }
         db.query(
            "INSERT INTO userdetail (email, password, name, dob, phone, gender, state) VALUES($1, $2, $3, $4, $5, $6, $7)",
            [req.body.email, hash, req.body.name, req.body.dob, req.body.phone, req.body.gender, req.body.state],
               (err, result) => {
                  if (err) {
                     console.error('Error executing query', err.stack);
                     res.status(500).json({ message: 'Database error occurred' });
                  } else {
                     res.status(200).json({ message: 'User added successfully' });
               }
            }
         );
      })
      
   }
});

app.post('/submit',async(req, res)=>{
   const email = req.body.email;
   const loginpassword = req.body.password;

   try {
      const result = await db.query("SELECT * FROM userdetail WHERE email = $1",[email,]);
      if (result.rows.length>0) {
         const user = result.rows[0];
         const storedhashedpassword=user.password;

         bcrypt.compare(loginpassword,storedhashedpassword,(err, result)=>{
            if (err) {
               console.error("error comparing password:",err);
            }
            else{
               
               if(result) {
                  res.json({message:"login successful"})
               }else{
                  res.json({message:"incorrect password"});
               }
            }
         });
      }
      else{
         res.json({message:"user not found"});
      }
   } catch (error) {
      console.log(error);
   }
} 
);
// Start the server

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
