//auth ,isStudent, isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next)=>{
    try{
        //extract jwt token
        const token = req.body.token;

        if(!token){
            res.status(401).json({
                success:false,
                message:"token missing"
            });
        }

        //verify token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token invalid"
            });
        }
        next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while verfiying of token"
        });
    }
}

exports.isStudent = (req, res,next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is protected route of students"
            });

        }
        next();
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"user role is not matching",
        });

    }
}


exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin",
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        })
    }
}