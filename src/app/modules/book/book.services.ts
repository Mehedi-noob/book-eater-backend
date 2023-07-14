import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelpers';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { cowSearchableFields } from './book.constant';
import { CowFilterType, CowType } from './book.interface';
import { Cow } from './cow.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const createCow = async (cow: CowType): Promise<CowType | null> => {
  const isSellerExist = await User.findById(cow.seller);
  if (!isSellerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
  }
  cow.label = 'for sale';
  const result = (await Cow.create(cow)).populate('seller');

  return result;
};

const getAllCows = async (
  filters: CowFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<CowType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  // Generating partial search mechanism
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Generating filter search mechanism
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        // if (field === 'maxPrice') {
        //   return {
        //     price: { $lte: value },
        //   };
        // } else if (field === 'minPrice') {
        //   return {
        //     price: { $gte: value },
        //   };
        // }
        // return {
        //   [field]: value
        // }
        return {
          [field === 'maxPrice' || field === 'minPrice' ? 'price' : field]:
            field === 'maxPrice'
              ? { $lte: value }
              : field === 'minPrice'
              ? { $gte: value }
              : value,
        };
      }),
    });
  }

  // It calculates the pagination parameters such as page, limit, skip, sortBy, and sortOrder using the PaginationHelpers.calculationPagination function.
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  // It initializes an empty object sortConditions to hold the sorting conditions.
  const sortConditions: { [key: string]: SortOrder } = {};

  // If sortBy and sortOrder are provided, it assigns them to the sortConditions object.
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<CowType | null> => {
  const result = await Cow.findById(id).populate('seller');

  return result;
};

const updateSingleCow = async (
  id: string,
  payload: Partial<CowType>
): Promise<CowType | null> => {
  const isExist = await Cow.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  }

  if (payload?.seller) {
    const isSellerExist = await User.findById(payload.seller);
    if (!isSellerExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
    }
  }

  const { ...cowData } = payload;

  const updatedCowData: Partial<CowType> = { ...cowData };

  const result = await Cow.findOneAndUpdate({ _id: id }, updatedCowData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  }).populate('seller');

  return result;
};

const deleteSingleCow = async (id: string): Promise<CowType | null> => {
  const result = await Cow.findByIdAndDelete(id).populate('seller');

  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateSingleCow,
  deleteSingleCow,
};
