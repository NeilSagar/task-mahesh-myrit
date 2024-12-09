import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  currentTime: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;


