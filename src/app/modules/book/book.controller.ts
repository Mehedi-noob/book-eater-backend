import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { CowType } from './book.interface';
import { CowService } from './cow.services';
import pick from '../../../shared/pick';
import { cowFilterableField } from './book.constant';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import { UserService } from '../user/user.services';
import { User } from '../user/user.model';

const createNewCowController: RequestHandler = catchAsync(async (req, res) => {
  const { ...cowData } = req.body;

  const result = await CowService.createCow(cowData);

  return sendResponse<CowType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cow created successfully',
    meta: null,
    data: result,
  });
});

const getAllCowsController: RequestHandler = catchAsync(async (req, res) => {
  // for filtering according to query
  const filters = pick(req.query, cowFilterableField);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // original service call
  const result = await CowService.getAllCows(filters, paginationOptions);

  // sending response according to filter and pagination
  return sendResponse<CowType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getCowByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // original service call
  const result = await CowService.getSingleCow(id);

  // scallable response sending according to req
  return sendResponse<CowType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Cow retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateCowByIdController: RequestHandler = catchAsync(async (req, res) => {
  // data retrieval according to req
  const id = req.params.id;
  const updatedData = req.body;

  // original service call
  if (req?.auth?.role === 'seller') {
    // get the cowInfo
    const cowInfo = await CowService.getSingleCow(id);

    if (cowInfo?.seller !== req?.auth?._id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  const result = await CowService.updateSingleCow(id, updatedData);
  // scallable response sending according to req
  return sendResponse<CowType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully',
    meta: null,
    data: result,
  });
});

const deleteCowByIdController: RequestHandler = catchAsync(async (req, res) => {
  // data retrieval according to req
  const id = req.params.id;

  if (req?.auth?.role === 'seller') {
    // get the cowInfo
    const cowInfo = await CowService.getSingleCow(id);

    if (cowInfo?.seller !== req?.auth?._id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
  }

  // original service call
  const result = await CowService.deleteSingleCow(id);

  // scallable response sending according to req
  return sendResponse<CowType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow delete successfully',
    meta: null,
    data: result,
  });
});

export const CowController = {
  createNewCowController,
  getAllCowsController,
  getCowByIdController,
  updateCowByIdController,
  deleteCowByIdController,
};
