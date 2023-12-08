import {
    newReview,
    add_a_new_game_to_the_db, get_all_the_games_on_db, get_a_game_using_the_id, get_all_the_authors_on_db, get_a_author_using_the_id, add_a_new_review_to_the_db, get_all_the_reviews_on_db,
    get_a_review_using_the_id
} from '../controllers/random.controller'
type parent = {
    id: number
}

const resolvers = {
    Query : {
        async game (_:parent, {id}: {id: number}) {
            return await get_a_game_using_the_id(id)
        },

        async games () {
            return await get_all_the_games_on_db()
        },

        async author (_:parent, {id}: {id: number}) {
            return await get_a_author_using_the_id(id)
        },

        async authors () {
            return await get_all_the_authors_on_db()
        },

        async review (_:parent, {id}: {id: number}) {
            return await get_a_review_using_the_id(id)
        },

        async reviews () {
            return await get_all_the_reviews_on_db()
        },
    },
    Mutation: {
        async createGame (_: parent, {title, date}: {title: string, date: string}) {
            const newGame = await add_a_new_game_to_the_db(title, date)
            return newGame
        },

        async createReview (
                _: parent,
                {info: {authorId, gameId, rating, content}}: {info: newReview}
            ) {
            const newReview = await add_a_new_review_to_the_db({authorId, gameId, rating, content})
            return newReview
        }
    },

    Game : {
        reviews () {
            
        }
    }
}
export default resolvers