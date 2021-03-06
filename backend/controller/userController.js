import asynchandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


//@desc Auth user and get token
//@route POST /api/users/login 
//@access Public
const authUser = asynchandler (async ( req, res ) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
                    

//@desc Register new user
//@route POST /api/users 
//@access Public
const registerUser = asynchandler (async ( req, res ) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    
    if(userExists){
        res.status(401);
        throw new Error('User already exists');
    }
    
    const user = await User.create({ name, email, password });
    
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc get user profile
//@route GET /api/users/profile 
//@access Private
const getUserProfile = asynchandler (async ( req, res ) => {
    const user = req.user;
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        }); 
    }else{
        res.status(401);
        throw new Error('User not found');
    }
});

//@desc Update user profile
//@route PUT /api/users/profile 
//@access Private
const updateUserProfile = asynchandler (async ( req, res ) => {
    const user = req.user;
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        }); 
    }else{
        res.status(401);
        throw new Error('User not found');
    }
});
export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
};