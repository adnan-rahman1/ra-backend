const { check, validationResult } = require("express-validator");

exports.signUpValidationRule = [
  check("name")
    .notEmpty()
    .trim()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 character long"),

  check("email")
    .notEmpty()
    .trim()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be email"),

  check("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 12 })
    .withMessage("Password must be 12 character long")
];

exports.signInValidationRule = [
  check("email")
    .notEmpty()
    .trim()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be email"),

  check("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 12 })
    .withMessage("Password must be 12 character long")
];

exports.validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
  next();
};