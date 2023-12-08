import gql from 'graphql-tag'

const typeDefs = gql`
# Schema definitions go here
type Game {
    id: ID!
    title: String!
    platform: [String!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
}

type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "if the author has been verified"
    verified: Boolean!
}


type Query {
    reviews: [Review]
    games: [Game]
    authors: [Author]
}

#--start-- inputs
export input NewGameInput {
    title: String!
}
#--end--

#--start-- mutations
type Mutation {
    createGame(title: String!): Game
}
#--end--
`;

export default typeDefs;