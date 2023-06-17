const mongoose = require("mongoose");

const courseListSchema = mongoose.Schema({
  code: {
    type: String,
    required: [true, "Please Enter Course Id"],
    trim: true
  },
  name: {
    type: String,
    required: [true, "Please Enter Course Name"],
    trim:true
  }
  
});

module.exports = mongoose.model("courselist", courseListSchema);