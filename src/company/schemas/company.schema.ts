import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  _region: mongoose.SchemaTypes.ObjectId,
  name: String,
  nit: String,
  address: String,
  phone: Number,
  email: String,
  activity: String,
  rep: String,
});
