import axios from 'axios';

const backendUri = "http://localhost:5500";


export async function fetchDriversApi() {
  try {
    const result = await axios.get(`${backendUri}/drivers`);
    return result.data.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
}

export async function fetchLocationApi(driverId) {
    try {
      const result = await axios.get(`${backendUri}/locations/${driverId}`);
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.error("Error fetching drivers:", error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  }
