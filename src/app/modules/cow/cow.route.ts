import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/',
  auth('seller'),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createNewCowController
);

router.get(
  '/:id',
  auth('admin', 'seller', 'buyer'),
  CowController.getCowByIdController
);

router.patch(
  '/:id',
  auth('seller'),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCowByIdController
);

router.delete('/:id', auth('seller'), CowController.deleteCowByIdController);

router.get(
  '/',
  auth('admin', 'seller', 'buyer'),
  CowController.getAllCowsController
);

export const CowRoutes = router;
