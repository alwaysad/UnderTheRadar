const Business = require("../models/Business");

const { getBusiness, editBusiness, deleteBusiness } = require("../controller/businessController");


const router = require("express").Router();

//get business
router.get("/getBusiness/:id", getBusiness );
//update business
router.put("/edit/:id", editBusiness);
//delete business
router.delete('/delete/:id',deleteBusiness)
module.exports = router;
