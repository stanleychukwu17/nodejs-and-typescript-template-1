import {MongoClient} from 'mongodb'
const Pool = require('pg').Pool

//--START-- for mongodb
    // define the type of callback function
    type callbackFn = (info?:any) => void

    // declaration of variables to be used/updated
    let dbConnection: any
    let dbUrl:string = 'mongodb://localhost:27017/bookstore'

    module.exports = {
        connectToDb : (cb: callbackFn) => {
            MongoClient.connect(dbUrl)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                return cb(err)
            })
        },

        getDb : () => dbConnection
    }
//--END--

//--START-- for postgres
const pool = new Pool({
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWD,
    'database': process.env.DB,
    'host': process.env.HOST,
    'port':process.env.DB_PORT
})

export default pool
//--END--