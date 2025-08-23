import { Router } from 'express';
import { PropertyController } from '../controllers/Property-controller';
import { handleErrors } from '../middleware/ErrorsRequest';
import { body } from 'express-validator';
import { checkAuth } from '../middleware/CheckAuth';

const routerProperty = Router();

routerProperty.get('/all-properties', PropertyController.getAllProperties)

routerProperty.get('/get-my-properties', checkAuth, PropertyController.getMyProperties)

routerProperty.post(
  '/create',
  checkAuth,
  // Validation
  body("title").notEmpty().withMessage("Title is required").isLength({ max: 100 }),
  body("description").notEmpty().withMessage("Description is required").isLength({ max: 500 }),
  body("category").notEmpty().withMessage("Category is required")
      .isIn(["Houses", "Apartment", "Warehouse", "Lots", "Cabins"]),
  body("price").notEmpty().withMessage("Price is required").isFloat({ gt: 0 }),
  body("bedroom").notEmpty().withMessage("Bedrooms are required").isInt({ min: 0 }),
  body("parking").notEmpty().withMessage("Parking spots are required").isInt({ min: 0 }),
  body("bathroom").notEmpty().withMessage("Bathrooms are required").isInt({ min: 0 }),
  body("location").notEmpty().withMessage("Location is required"),
  handleErrors,
  PropertyController.createProperty
);

export default routerProperty;
