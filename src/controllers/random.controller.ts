// import { errorLogger, log } from '../logger/';
import { pool } from '../db'
import {show_bad_message, show_good_message} from '../functions/utils'

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
    const res = qCheck.rows
    console.log(res)

    return res
}