const {GraphQLObjectType, GraphQLSchema} = require('graphql');
const rootquery = require('./Query/RootQuery');
const mutation = require('./Mutation/Index');

const SchemaApp = new GraphQLSchema({
    query: rootquery,
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutation 
        // () => {
        //     return {
                
        //     }
            
        // }
    })
});

module.exports = SchemaApp;