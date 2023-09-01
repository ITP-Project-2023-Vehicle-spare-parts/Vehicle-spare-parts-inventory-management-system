const { generateToken } = require('../config/jwtToken');
const User = require('../model/userModel');
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler( async(req,res)=>{
    const email= req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        //create new
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        throw new Error("user exists");
        //already exist
    }
});

const loginUserCtrl = asyncHandler(async (req,res) => {
    const {email,password}= req.body;

    //check if user exists or not
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            id: findUser?._id,
            firstname: findUser?.firstname,
            lastname:findUser?.lastname,
            email: findUser?.email,
            mobile:findUser?.mobile,
            token: generateToken(findUser?._id),

        });

    }else{
        throw new Error("Invalid credentials");
    }
});


//get all users

const getallUser = asyncHandler(async(req,res) =>{
    try{
        const getUsers= await User.find();
        res.json(getUsers);

    }catch(error){
        throw new Error(error)
    }
});

//get a single user

const getaUser= asyncHandler(async(req,res)=>{
    console.log(req.params);
    const {id}= req.params;
    try{
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });

    }catch(error){
        throw new Error(error);
    }
   
});

//delete user

const deleteaUser= asyncHandler(async(req,res)=>{
    console.log(req.params);
    const {id}= req.params;
    try{
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });

    }catch(error){
        throw new Error(error);
    }
   
});

//update user

const updateaUser = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    try{
        const updateaUser= await User.findByIdAndUpdate(id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            mobile:req?.body?.mobile,
            gender:req?.body?.gender,
            address:req?.body?.address,
            nic:req?.body?.nic,
            dob:req?.body?.dob,
        },{
            new:true,
        }
        );
        res.json(updateaUser);

    }catch(error){
        throw new Error(error)
    }
});





module.exports={createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updateaUser};