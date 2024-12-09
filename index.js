import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db/connectDb.js';
import Location from './models/LocationModel.js';
import cors from 'cors';
import Driver from './models/DriverModel.js';


const app = express();
const port = 5500;

// Middleware for parsing JSON
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.get("/drivers", async (req, res) => {
  try {
    // Assuming `Driver` is a Sequelize model or similar
    const drivers = await Driver.find(); // Fetch all driver records from the database
    
    res.status(200).json({
      success: true,
      data: drivers, // Send the drivers' data as a response
    });
  } catch (error) {
    console.error("Error fetching drivers:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch drivers.",
    });
  }
});

app.get('/locations/:driverId', async (req, res) => {
  const { driverId } = req.params;

  try {
      const locations = await Location.find({ driverId });
      res.status(200).json({
          data: locations,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Error fetching locations',
      });
  }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });