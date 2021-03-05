//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
import express, { Router } from 'express';

//* Controllers
import { addController, getController } from '../controllers/item.controller';

//* Utils import
import validAdd from '../utils/valid';

//* ------------------ CONFIGURATION ------------------ *\\

const itemRouter: Router = express.Router();

//* --------------------- ROUTES ---------------------- *\\

/**
 * Adds a new item to the database.
 * @name post/api/item/add
 * @access public
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} callback - Express callback.
 */
itemRouter.post('/add', validAdd, addController);

/**
 * Fetches all items from the database.
 * @name get/api/item/get
 * @access public
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} callback - Express callback.
 */
itemRouter.get('/get', getController);

//* --------------------- EXPORTS --------------------- *\\

export default itemRouter;
