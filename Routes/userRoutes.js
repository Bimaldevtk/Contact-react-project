const express =require("express");
const {registerUser, loginUser, curretUser}=require("../Controller/userController");
const router =express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/current",curretUser);
module.exports =router;