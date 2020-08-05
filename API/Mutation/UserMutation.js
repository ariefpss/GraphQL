const {
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const usertype = require('../Query/UserType');
const authdatatype = require('../Query/AuthDataType');
const User = require('../Model/User');

//CREATE
const createUser = {
    type:usertype,
    args:{
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve:async function(root, args){
        try {
            const existUser = await User.findOne({email: args.email});
            if (existUser) {
                throw new Error('User exists already');
            };
            const passwordHash = bcrypt.hashSync(args.password, 10);
            const mdluser = new User({
                _id: mongoose.Types.ObjectId(),
                email: args.email,
                password: passwordHash
            });
            const newUser = await mdluser.save();
            return newUser; 
        } catch (err){
            throw err;
        }
    } 
};

//UPDATE
const updateUser ={
    type: usertype,
    args:{
        _id: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async function(root, args, req){
        if (!req.chekAuth) throw new Error('Unauthenticated!');

        let updtuser = {};
        if (args.email) updtuser.email = args.email;
        
        const updateuser = await User.findByIdAndUpdate(args._id, updtuser, {new: true});
        if (!updateuser) throw new Error('User id dont exists');

        return updateuser;
    }
}

//DELETE
const deleteUser = {
    type:usertype,
    args:{
        _id:{type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async function(root, args, req){
        if (!req.chekAuth) throw new Error('Unauthenticated!');

        const deleteuser = await User.findByIdAndRemove(args._id);
        if(!deleteuser) throw new Error('User id dont exists');
        return deleteuser;
    }
};

//LOGIN USER
const loginUser = {
    type:authdatatype,
    args:{
        email:{type: new GraphQLNonNull(GraphQLString)},
        password:{type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async function(root, args){
        const user = await User.findOne({email: args.email});
        if (!user) throw new Error('User does not exists');

        const equalPass = await bcrypt.compare(args.password, user.password);
        if (!equalPass) throw new Error('Password is incorrect');

        const token = jwt.sign(
            {userId: user._id, email: user.email}, 
            process.env.JWT_KEY,
            {expiresIn: '1h'}
        );

        return {userid: user._id, token: token, tokenExpiration: '1hour'};
        
    }
};

module.exports = {createUser, loginUser, deleteUser, updateUser};