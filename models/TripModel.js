import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  tripId: { type: String, required: true, unique: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  startTime: { type: Number, required: true }, // Stored as UNIX timestamp
  endTime: { type: Number, required: true },   // Stored as UNIX timestamp
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
