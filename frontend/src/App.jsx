import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchDriversApi, fetchLocationApi } from "./service/api";

// Constants for grid rows and columns
const [rows, cols] = [20, 20];

// Function to map coordinates to grid positions
const handleMapCoordinatesToGrid = (lat, lon) => {
  const row = Math.round((lat / 90) * (rows - 1)); // Latitude mapped to grid rows
  const col = Math.round((lon / 180) * (cols - 1)); // Longitude mapped to grid columns
  return { row, col };
};

// Grid Component for rendering the grid and marking coordinates
const Grid = ({ locations }) => {
  const mapCoordinatesToGrid = (lat, lon) => {
    return handleMapCoordinatesToGrid(lat, lon);
  };

  const renderGrid = () => {
    const grid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isMarked = locations.some((point) => {
          const { row, col } = mapCoordinatesToGrid(point.latitude, point.longitude);
          return row === r && col === c;
        });

        grid.push(
          <div
            key={`${r}-${c}`}
            className={`cell ${isMarked ? "marked" : ""}`}
          ></div>
        );
      }
    }
    return grid;
  };

  return <div className="grid">{renderGrid()}</div>;
};

// DriverSelect Component for handling driver selection
const DriverSelect = ({ drivers, selectedDriverId, setSelectedDriverId }) => {
  return (
    <select
      value={selectedDriverId}
      onChange={(e) => setSelectedDriverId(e.target.value)}
      style={{ padding: '10px', fontSize: '16px' }}
    >
      <option value="">-- Select a Driver --</option>
      {drivers.map((driver) => (
        <option key={driver._id} value={driver._id}>
          {driver.driverName}
        </option>
      ))}
    </select>
  );
};

// Main App Component
const App = () => {
  const [driverId, setDriverId] = useState(''); // State for selected driver ID
  const [drivers, setDrivers] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch drivers on mount
  useEffect(() => {
    const fetchDrivers = async () => {
      const driverData = await fetchDriversApi();
      setDrivers(driverData);
    };
    fetchDrivers();
  }, []);

  // Fetch locations when driverId changes
  useEffect(() => {
    if (driverId) {
      const fetchLocations = async () => {
        try {
          const locationData = await fetchLocationApi(driverId);
          setLocations(locationData || []); // Assuming the data is in the `data` key
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };
      fetchLocations();
    }
  }, [driverId]);

  return (
    <div className="App">
      {/* Driver selection component */}
      <DriverSelect 
        drivers={drivers} 
        selectedDriverId={driverId} 
        setSelectedDriverId={setDriverId}
      />

      <h1>Coordinate Grid Mapper</h1>

      {/* Grid rendering component */}
      <Grid locations={locations} />
    </div>
  );
};

export default App;
