//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
import { check } from 'express-validator';

//* ---------------- Auth Valdidations ---------------- *\\
const validAdd = [
  check('name', 'name field is required').notEmpty(),

  check('name', 'name cant be longer than 24 characters').isLength({
    max: 24,
  }),
];

//* --------------------- EXPORTS --------------------- *\\

export default validAdd;
