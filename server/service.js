const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "login",
        user: "kimberly",
        password: "apple"
    }
});

class NoteService {
    constructor(knex) {
        this.knex = knex;
    }

    getNote(user) {
        let query = this.knex
            .select('notes.id', 'notes.content')
            .from('notes')
            .innerJoin('users', 'notes.user_id', 'users.id')
            .where('users.username', user)
            .orderBy('notes.id');
        // console.log("getNote")
        return query.then((rows) => {
            return rows.map((row) => ({
                id: row.id,
                content: row.content,
            }));
        })
    }

    addNote(note, username) {
        let query = this.knex
            .select('id')
            .from('users')
            .where('username', username);

        return query.then((result) => {
            return this.knex('notes')
                .insert({
                    content: note,
                    user_id: result[0].id
                })
        })

    }

    updateNote(noteid, note) {
        return this.knex('notes')
            .where('id', noteid)
            .update({
                content: note,
            });
    }

    removeNote(noteid) {
        return this.knex('notes')
            .where('id', noteid)
            .del();

    }

}

module.exports = NoteService;