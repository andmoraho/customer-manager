import * as mongoose from 'mongoose';

export const ActionSchema = new mongoose.Schema({
  _user: mongoose.SchemaTypes.ObjectId,
  name: String,
});
