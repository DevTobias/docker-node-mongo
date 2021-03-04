//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
import { Request, Response } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';

//* Mongo DB Models
import Item from '../models/item.model';

//* ------------------- Controllers ------------------- *\\

/**
 * Adds a new item to the database.
 *
 * @param {Request} req
 * @param {Response} res
 * @return {void}
 */
async function addController(req: Request, res: Response) {
  //* Validate integrity constraints
  const errors: Result<ValidationError> = validationResult(req);

  //* If errors occured, stop register route and send errors
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'errors in request body',
      errors: errors.array(),
    });
  }

  //* Read needed fields from body
  const { name } = req.body;

  //* Try to add a new item
  try {
    const item = new Item({
      name,
    });

    //* Save the user in database
    await item.save();

    return res.status(200).json({
      success: true,
      message: 'item successfully added',
    });
  } catch (error) {
    console.error('an error occured in add item route: ', error);
    return res
      .status(500)
      .json({ success: false, message: 'internal server error' });
  }
}

/**
 * Fetches all items from database.
 *
 * @param {Request} req
 * @param {Response} res
 * @return {void}
 */
async function getController(_req: Request, res: Response) {
  //* Try to fetch all items
  try {
    const items = Item.find();

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error('an error occured in add item route: ', error);
    return res
      .status(500)
      .json({ success: false, message: 'internal server error' });
  }
}

//* --------------------- EXPORTS --------------------- *\\

export { addController, getController };
