import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  _company: mongoose.SchemaTypes.ObjectId,
  _action: mongoose.SchemaTypes.ObjectId,
  _status: mongoose.SchemaTypes.ObjectId,
  _product: mongoose.SchemaTypes.ObjectId,
  name: String,
  identification: String,
  email: String,
  phone: Number,
  address: String,
  rate: Number,
  comments: String,
  date: Date,
  next_visit: Date
});
