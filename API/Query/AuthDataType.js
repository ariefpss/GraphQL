const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const AuthData = new GraphQLObjectType({
    name:'Authentication',
    description:'authentication data user login',
    fields:() => ({
        userid:{type: new GraphQLNonNull(GraphQLID)},
        token:{type: GraphQLString},
        tokenExpiration:{type: GraphQLString}
    }) 
});

module.exports = AuthData;