


//temporary method to check route is working or not
exports.getNonPreferencesCourse=(req,res)=>{
console.log("Non prefernce slots of Course Instructors")
 res.status(201).json({
            success: true,
            "message":"Non prefernce slots of Course Instructors"
        });
}