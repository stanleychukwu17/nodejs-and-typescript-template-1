import { add_a_new_game_to_the_db } from '../controllers/random.controller'
type parent = {
    id: number
}

const resolvers = {
    Query : {
        async game () {
            // const allGames = 
        }
    },
    Mutation: {
        async createGame (_: parent, {title, date}: {title: string, date: string}) {
            const newGame = await add_a_new_game_to_the_db(title, date)
            return newGame
        }
    }
}
export default resolvers