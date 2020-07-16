const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const mongoose = require('mongoose');

const usertype = require('./UserType');
const User = require('../Model/User')

const TodoType = new GraphQLObjectType({
    name:'Todo',
    description:'todo type definition',
    fields:() => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        userId: {
            type:usertype,
            resolve: async function(todo){
                var user = await User.findById(mongoose.Types.ObjectId(todo.userId));
                return user
            }
        },
        task: {type: GraphQLString}
    })
});

module.exports = TodoType;