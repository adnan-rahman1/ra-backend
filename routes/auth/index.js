const { Router } = require("express");
const router = Router();
const { signUp, signIn, auth, signOut, accountActivation } = require("../../controllers/auth");
const {
  signUpValidationRule,
  signInValidationRule,
  validationError
} = require("../../validation/auth");

const { userAvaterConfigMiddleware } = require("../../config/photo");

router.post("/test", userAvaterConfigMiddleware, (req, res) => {
  res.status(200).send("Got it");
})

router.post("/signup", signUpValidationRule, validationError, userAvaterConfigMiddleware, signUp);
router.post("/account-activation", accountActivation);

router.post("/signin", signInValidationRule, validationError, signIn);
router.get('/auth', auth);
router.post("/signout", signOut);

module.exports = router;