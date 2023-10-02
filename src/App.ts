import express from 'express'
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
import {log, errorLogger} from './logger'
import { get_the_line_where_this_error_occurred } from './functions/utils'

//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());

//* import {connectToDb, getDb} from './db'
const {ObjectId} = require('mongodb');
const {connectToDb, getDb} = require('./db')

//--START-- here is how to use the logger to log both errors and information, we have .info, .error, .warn, and .debug methods
// errorLogger.info({stanley:'my  name is stanley', lastName: 'my last name is chukwu'})

// const error = new Error('Error occurred').stack!; // this will help me to get the line where the error occurred, then we will use regular expression to capture only the information that wee need
// const capturedErrorLine = get_the_line_where_this_error_occurred({errorMessage: error})
// errorLogger.error({'lineNumber': capturedErrorLine}, 'see error message 2')
//--END--

//* opens connection to the mongodb database before listening for request
let db: any
connectToDb((err: any) => {
    if (!err) {
        // now we can start listening for events
        // app.listen(port, () => {
        //     console.log(`now listening to request from port ${port}`)
        // })

        // updates our database variable
        db = getDb()
    } else {
        console.log(`we have an error, error: ${err}`)
    }
})


// app.listen(port, () => {
//     console.log(`now listening to request from port ${port}`)
// })