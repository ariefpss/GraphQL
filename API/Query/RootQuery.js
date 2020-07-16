const {
    GraphQLObjectType,
    GraphQLList
} = require('graphql');

const User = require('../Model/User');
const usertype = require('./UserType');

const RootQuery = new GraphQLObjectType({
    name: 'BlogSchemaApp',
    fields: () => ({
        user: {
            type: new GraphQLList(usertype),
            resolve: async function(){
                let user = await User.find({});
                return user;
            }
        }
    })
});

module.exports = RootQuery;