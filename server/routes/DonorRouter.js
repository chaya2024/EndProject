const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const DonorRouter = express.Router()
const donorController= require("../controllers/donorController")
DonorRouter.post("/",verifyJWT, donorController.creatNewDonor)
DonorRouter.get("/", donorController.getAllDonors)
DonorRouter.get("/id/:id", donorController.getDonorById)
DonorRouter.get("/name/:name", donorController.getDonorByName)
DonorRouter.put("/",verifyJWT, donorController.updateDonor)
DonorRouter.delete("/:id",verifyJWT, donorController.deleteDonor)

module.exports = DonorRouter 