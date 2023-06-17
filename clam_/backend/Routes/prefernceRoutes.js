const express =require("express");
const {getNonPreferencesCourse} = require("../Controllers/prefernceController");
const router=express.Router();


//Route: get all non preferences of course instructor
router.route("/getNonPreferencesCourse").get(getNonPreferencesCourse)


module.exports=router