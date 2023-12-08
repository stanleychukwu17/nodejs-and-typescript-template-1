// import { errorLogger, log } from '../logger/';
import { pool } from '../db'
import {show_bad_message, show_good_message} from '../functions/utils'

//*--start--games
// creates a new game
export async function add_a_new_game_to_the_db (title: string, dateReleased: string) {
    const good_msg = show_good_message()

    // checks to see if there are any active sessions for this user
    const qCheck = await pool.query("SELECT id from games where title = $1 limit 1", [title])
    const num_rows = qCheck.rows.length
    if (num_rows > 0) {
        return show_bad_message('This game already exists')
    }

    // create a new session and return it
    const qIn = await pool.query("INSERT INTO games (title, date_released) values ($1, $2) RETURNING *", [title, dateReleased])

    return {...good_msg, ...qIn.rows[0]}
}

// returns all of the games
export async function get_all_the_games_on_db () {
    const qCheck = await pool.query("SELECT * from games order by id desc")
    return qCheck.rows
}

// get a game by using the game id
export async function get_a_game_using_the_id(id:number) {
    const qCheck = await pool.query("SELECT * from games where id = $1 limit 1", [id])
    return qCheck.rows[0]
}
//*--end--games

//*--start--authors
// returns all of the games
export async function get_all_the_authors_on_db () {
    const qCheck = await pool.query("SELECT * from users order by id desc")
    return qCheck.rows
}

// get a game by using the game id
export async function get_a_author_using_the_id(id:number) {
    const qCheck = await pool.query("SELECT * from users where id = $1 limit 1", [id])
    return qCheck.rows[0]
}
//*--end--authors

//*--start--reviews
// creates a new game
export type newReview = {
    gameId: number,
    authorId: number,
    rating: number,
    content: string,
}
export async function add_a_new_review_to_the_db ({gameId, authorId, rating, content}: newReview) {
    const good_msg = show_good_message()
    console.log({gameId, authorId, rating, content})

    // create a new session and return it
    const qIn = await pool.query("INSERT INTO game_reviews (game_id, author_id, rating, content, date_added) values ($1, $2, $3, $4, now()) RETURNING *", [gameId, authorId, rating, content])

    return {...good_msg, ...qIn.rows[0]}
}

// returns all of the games
export async function get_all_the_reviews_on_db () {
    const qCheck = await pool.query("SELECT * from game_reviews order by id desc")
    return qCheck.rows
}

// get a game by using the game id
export async function get_a_review_using_the_id(id:number) {
    const qCheck = await pool.query("SELECT * from game_reviews where id = $1 limit 1", [id])
    return qCheck.rows[0]
}
//*--end--reviews