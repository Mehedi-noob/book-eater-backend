import { Model, Types } from 'mongoose';
import { UserType } from '../user/user.interface';

export type CowType = {
  name: string;
  age: number;
  price: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';
  breed:
    | 'Brahman'
    | 'Nellore'
    | 'Sahiwal'
    | 'Gir'
    | 'Indigenous'
    | 'Tharparkar'
    | 'Kankrej';
  label: 'for sale' | 'sold out';
  category: 'Dairy' | 'Beef' | 'DualPurpose';
  weight: number;
  seller: Types.ObjectId | UserType;
};

export type CowModel = Model<CowType, Record<string, unknown>>;

export type CowFilterType = {
  searchTerm?: string;
  price?: string;
  location?: string;
  category?: string;
  breed?: string;
  seller?: string;
};
