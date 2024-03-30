const asyncHandler =require("express-async-handler");
const User =require("../Models/userModels");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

//@desc Register a user
//@routes POST / api/users/register
//@access public
const registerUser =asyncHandler(async (req,res) =>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new ErrorEvent("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error ("User already registered!");
    }

    //Hash password 
    const hashedPassword =await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error ("User data is not valid")
    }

     res.json({message: "Register the user"});
});

//@desc Login a user
//@routes POST / api/users/login
//@access public
const loginUser =asyncHandler(async (req,res) =>{

    const{email,password} =    req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory!")
    }
    const user =await User.findOne({email});
    //compare password with hashed password
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken =jwt.sign({
            //payload
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECERT,
        { expiresIn:"1m"}
        );
        res.json({accessToken});
    }else{
        res.status(401)
        throw new Error ("email or password not valid")
    }


});

//@desc current user info
//@routes POST / api/users/current
//@access private
const curretUser =asyncHandler(async (req,res) =>{
    res.json({message: "current user"});
});





module.exports ={registerUser,loginUser,curretUser};