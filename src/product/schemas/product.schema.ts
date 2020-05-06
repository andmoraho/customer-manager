import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  _user: mongoose.SchemaTypes.ObjectId,
  name: String,
});
