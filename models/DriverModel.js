import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  driverId: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
