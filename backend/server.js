const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/main', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your Mongoose models for users and institute requests here
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  userType: String, // 'institute' or 'student'
  instituteName: String,
  district: String, // Add other fields as needed
  approvalStatus: String, // 'Pending', 'Approved', or 'Rejected'
  // Add other fields as needed
});

// API endpoints

// Register an institute or student
app.post('/api/institute/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      instituteName,
      district,
      courseCode,
      ownerName,
      instituteAddress,
      pincode,
      contactNumber,
    } = req.body;

    // Create and save the institute registration request
    const newInstitute = new User({
      name,
      email,
      password,
      userType: 'institute',
      instituteName,
      district,
      courseCode,
      ownerName,
      instituteAddress,
      pincode,
      contactNumber,
      approvalStatus: 'Pending',
    });

    await newInstitute.save();

    res.status(201).json({ message: 'Institute registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Institute registration failed' });
  }
});

// Fetch pending institute registration requests
app.get('/api/institute/pendingRequests', async (req, res) => {
  try {
    const pendingRequests = await User.find({
      userType: 'institute',
      approvalStatus: 'Pending',
    });

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending requests' });
  }
});

// Approve an institute registration request
app.put('/api/institute/approve/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Update the approvalStatus to 'Approved' for the institute with the given ID
    await User.findByIdAndUpdate(userId, { approvalStatus: 'Approved' });

    res.status(200).json({ message: 'Request approved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve request' });
  }
});

// Reject an institute registration request
app.put('/api/institute/reject/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Update the approvalStatus to 'Rejected' for the institute with the given ID
    await User.findByIdAndUpdate(userId, { approvalStatus: 'Rejected' });

    res.status(200).json({ message: 'Request rejected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  

