//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules

import mongoose, { Schema, Document } from 'mongoose';

//* --------------------- MODELS ---------------------- *\\

/**
 * Defines the item object which can be fetched from database.
 *
 * @export
 * @interface IItem
 * @extends {Document}
 */
export interface IItem extends Document {
  name: string;
}

//* Create the mongo database user schema
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

//* --------------------- EXPORTS --------------------- *\\

//* Export the model and return the IUser interface
export default mongoose.model<IItem>('item', ItemSchema);
