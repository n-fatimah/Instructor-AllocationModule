const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  
  personalid: {
    type: String,
    required: [true, "Please Enter Your Id"],
  },

 role: {
    type: Number,
    required: [true, "Please Enter Your role"],

    //0 for course inst, 1 for lab inst and 2 as both
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
     select: false,
  },

});

userSchema.methods.compareId = function (userid) {

 if(userid==this.personalid)
   return true
 else
   return false
 
};

module.exports = mongoose.model("user", userSchema);