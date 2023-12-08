import { Router } from "express";
const router = Router();

import AppError from "../utils/errorHandling/AppError.js";
import { catchAsync } from "../utils/errorHandling/errorHandlers.js";
import { signupServices } from "../services/authServices.js";
import { loginServices } from "../services/authServices.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

//USER SIGNUP
router.post(
  "/api/auth/signup",
  catchAsync(async (req, res, next) => {
    console.log("Signup endpoint is hit.");
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    await signupServices.registerUserWithFirebase(newUser);
    res
      .status(200)
      .json({ success: true, message: "User registered successfully." });
  })
);

// USER LOGIN
router.post(
  "/api/auth/login",
  catchAsync(async (req, res, next) => {
    console.log("login endpoint is hit.");
    const { idToken } = req.body;
    if (!idToken) {
      return next(new AppError("ID token is missing from the request.", 400));
    }
    await loginServices.verifyIdToken(idToken);
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully." });
  })
);

// USER LOGIN CHECK
router.post(
  "/api/auth/login/guard",
  isAuthenticated,
  catchAsync(async (req, res, next) => {
    console.log("Login check endpoint is hit.");
    const { idToken } = req.body;
    if (!idToken) {
      return next(new AppError("ID token is missing. Not logged in.", 400));
    } else {
      res.status(200).json({ success: true, message: "User logged in" });
    }
  })
);

// USER LOGOUT (Actually done in client side. For sending response purposes only.)
router.get(
  "/api/auth/logout",
  catchAsync(async (req, res, next) => {
    res.status(200).json({ success: true, message: "Logout initiated." });
  }));

export default router;
