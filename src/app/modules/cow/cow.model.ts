import { Schema, model } from 'mongoose';
import { breed, category, label, location } from './cow.constant';
import { CowModel, CowType } from './cow.interface';

const cowSchema = new Schema<CowType, CowModel>(
  {
    name: {
      type: String,
      required: [true, 'name is missing!'],
    },
    age: {
      type: Number,
      required: [true, 'age is missing!'],
    },
    price: {
      type: Number,
      required: [true, 'price is missing!'],
    },
    location: {
      type: String,
      enum: {
        values: location,
        message: '{VALUE} is not matched',
      },
      required: [true, 'location is missing!'],
    },
    breed: {
      type: String,
      enum: {
        values: breed,
        message: '{VALUE} is not matched',
      },
      required: [true, 'breed is missing!'],
    },
    label: {
      type: String,
      enum: {
        values: label,
        message: '{VALUE} is not matched',
      },
      default: 'for sale',
      required: [true, 'label is missing!'],
    },
    category: {
      type: String,
      enum: {
        values: category,
        message: '{VALUE} is not matched',
      },
      required: [true, 'category is missing!'],
    },
    weight: {
      type: Number,
      required: [true, 'weight is missing!'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'seller is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<CowType, CowModel>('Cow', cowSchema);
