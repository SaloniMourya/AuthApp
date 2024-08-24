const express = require("express");
const router = express.Router();

const {login, signup} = require("../Controller/Auth");
const {auth,isAdmin,isStudent}=require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req,res)=>{

    res.json({
        success:true,
        message:"welcome to protected route of Tests"
    })
})

//protected route
router.get("/student", auth, isStudent, (req, res)=>{
    res.json({
        success:true,
        message:"welcome to protected route of students"
    })
});


router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for Admin",
    });
    
});

module.exports = router;





