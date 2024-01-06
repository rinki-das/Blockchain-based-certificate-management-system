const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const mongoURL = 'mongodb://127.0.0.1:27017'; // Update with your MongoDB URL
const dbName = 'NIELIT'; // Update with your database name


app.post('/upload', async (req, res) => {
  let client;
  try {
    console.log('Attempting to connect to MongoDB');
    client = await MongoClient.connect(mongoURL);
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Validate and extract course name, batch code, and start date from the request
    const { courseName, batchCode, startDate } = req.body;

    if (!courseName || !batchCode || !startDate || typeof courseName !== 'string' || typeof batchCode !== 'string' || typeof startDate !== 'string') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create a collection name by combining course name, batch code, and start date
    const collectionName = `${courseName}_${batchCode}_${startDate}`;
    const collection = db.collection(collectionName);

    const studentData = req.body;

    // Check if a student with the same student ID already exists in the collection
    const existingStudent = await collection.findOne({ studentId: studentData.studentId });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student with the same ID already exists' });
    }

    const result = await collection.insertOne(studentData);
    console.log('Data saved in MongoDB:', result);

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error saving data' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

let client; // Declare the 'client' variable outside of the route handlers

app.get('/fetch-data', async (req, res) => {
  try {
    const courseName = req.query.courseName;

    console.log('Attempting to connect to MongoDB');
    client = await MongoClient.connect(mongoURL);
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Validate and sanitize the course name for the collection name
    if (!courseName || typeof courseName !== 'string') {
      return res.status(400).json({ message: 'Invalid course name' });
    }

    const collection = db.collection(courseName);

    const result = await collection.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching data' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});

app.get('/fetch-report-data', async (req, res) => {
  try {
    const courseName = req.query.courseName;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    console.log('Attempting to connect to MongoDB');
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Validate and sanitize the course name for the collection name
    if (!courseName || typeof courseName !== 'string') {
      return res.status(400).json({ message: 'Invalid course name' });
    }

    const collection = db.collection(courseName);

    const query = {
      startDate: { $gte: startDate.toISOString() },
      endDate: { $lte: endDate.toISOString() },
    };

    const result = await collection.find(query).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching report data' });
  } finally {
    await client.close();
  }
});

app.post('/update-certificate', async (req, res) => {
  try {
    const courseName = req.body.courseName;
    const studentId = req.body.studentId;

    // Validate and sanitize the course name for the collection name
    if (!courseName || typeof courseName !== 'string') {
      return res.status(400).json({ message: 'Invalid course name' });
    }

    const db = client.db(dbName);
    const collection = db.collection(courseName);

    const updatedCertificateData = {
      certificateNumber: req.body.certificateNumber,
    };

    const result = await collection.updateOne({ studentId }, { $set: updatedCertificateData });

    if (result.modifiedCount > 0) {
      res.json({ message: 'Certificate number updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found or certificate number not updated' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error updating certificate number' });
  } finally {
    await client.close();
  }
});

app.post('/update-data', async (req, res) => {
  try {
    const courseName = req.body.courseName;
    const studentId = req.body.studentId;

    // Validate and sanitize the course name for the collection name
    if (!courseName || typeof courseName !== 'string') {
      return res.status(400).json({ message: 'Invalid course name' });
    }

    const db = client.db(dbName);
    const collection = db.collection(courseName);

    const updatedData = req.body;

    const result = await collection.updateOne({ studentId }, { $set: updatedData });

    if (result.modifiedCount > 0) {
      res.json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ message: 'Data not found or not updated' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error updating data' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
