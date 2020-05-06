import * as mongoose from 'mongoose';

export const StatusSchema = new mongoose.Schema({
  _user: mongoose.SchemaTypes.ObjectId,
  name: String,
});
