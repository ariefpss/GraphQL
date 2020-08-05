const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

//READ
const UserType = new GraphQLObjectType({
    name:'User',
    description:'user type definition',
    fields:() => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        email: {type: GraphQLString}
    })
});

module.exports = UserType;