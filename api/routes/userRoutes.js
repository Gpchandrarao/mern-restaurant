const userController = require("../controllers/userController")
const express = require("express")
const verification = require("../middlewares/verification");


const router = express.Router()


router.post("/user-register", userController.userRegister)
router.post("/user-login", userController.userLogine)

module.exports = router