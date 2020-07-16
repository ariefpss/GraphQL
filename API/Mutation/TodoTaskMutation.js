const{
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const mongoose = require('mongoose')

const todotype = require('../Query/TodoType');
const Todo = require('../Model/Todo');
const User = require('../Model/User');

const addTask = {
    type:todotype,
    args:{
        userId:{type: new GraphQLNonNull(GraphQLString)},
        task:{type: GraphQLString}
    },
    resolve: async function(root, args){
        const equalUserId = await User.findById({_id: args.userId});;
        if (!equalUserId) throw new Error('User id incorrect');

        const mdlTodo = new Todo({
            id: mongoose.Types.ObjectId(),
            user_id: equalUserId,
            task: args.task
        });

        const newTaskTodo = await mdlTodo.save();
        return newTaskTodo;
    }
}

module.exports = {addTask};