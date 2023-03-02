const Business = require("../models/Business");

const { getBusiness, editBusiness, deleteBusiness, getAllBusiness } = require("../controller/businessController");
const verifyToken = require("../middleware/jwt");


const router = require("express").Router();

//get business
router.get('/getAllBusiness',getAllBusiness);
router.get("/getBusiness/:id", getBusiness );
//update business
router.put("/edit/:id",verifyToken, editBusiness);
//delete business
router.delete('/delete/:id',verifyToken,deleteBusiness)
module.exports = router;
