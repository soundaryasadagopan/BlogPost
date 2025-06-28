const express = require("express");
const { loginAdmin } = require("../Controller/adminController");

const adminRouter = express.Router();

adminRouter.post("/login",loginAdmin);

module.exports = adminRouter;