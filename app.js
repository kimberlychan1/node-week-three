  // Require Node Packages
const express = require('express');
const hb = require('express-handlebars');
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');

// Set up express and environment
const app = express();

// Require User create modules
const AuthChallenger = require("./AuthChallenger");
const NoteService = require('./server/service');
const NoteRouter = require('./server/router');

// Set up connection to postgres database via knex
const pg = require('pg');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "login",
        user: "kimberly",
        password: "apple"
    }
});



// Setup handlebars as express template engine
app.engine("handlebars", hb({defaultLayout:"main"}));
app.set("view engine", "handlebars");

// Setup middleware and serve public folder
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(
    basicAuth({
        authorizeAsync: true,
        authorizer: AuthChallenger(knex),
        challenge: true,
        realm: 'Note Taking with knex'
    })
)

let noteService = new NoteService(knex)
app.use('/api/notes', new NoteRouter(noteService).router());

app.get("/", (req, res) => {
    noteService.getNote(req.auth.user)
    .then((notes) => {
        // console.log("Getting", notes)
        res.render('index',{notes: notes});
    })
    .catch((err) => res.status(500).json(err))
})


app.listen(8080, ()=>{
    console.log("App is listening to port 8080");
});

module.exports.app = app;