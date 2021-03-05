const express = require('express');

class NoteRouter {
    constructor(noteService) {
        this.noteService = noteService;
    }

    router() {
        let router = express.Router();
        //.bind() create new function, set its [this] to the provided value
        router.get('/', this.get.bind(this));
        router.post('/', this.post.bind(this));
        router.put('/:id', this.put.bind(this));
        router.delete('/:id', this.delete.bind(this));

        return router;
    }

    get(req, res) { 
        // console.log("get", req.auth.user)
        return this.noteService
            .getNote(req.auth.user)
            .then((notes) => {
                // console.log("Getting", notes)
                res.render('index',{notes: notes});
            })
            .catch((err) => res.status(500).json(err))
    }

    post(req, res) {
        // console.log(req.body.comment)
        return this.noteService
            .addNote(req.body.comment, req.auth.user)
            .then(() => 
            this.noteService.getNote(req.auth.user))
            .then((notes) => {
                // console.log('posting', notes);
                // res.render('index',{notes: notes})
                res.redirect("/")
            })
            .catch((err) => res.status(500).json(err));
    }

    put(req, res) {
        // console.log("putting")
        // console.log("put",req.body)
        return this.noteService
            .updateNote(req.params.id, req.body.comment)
            .then(() => this.noteService.getNote(req.auth.user))
            .then((notes) => {
                // console.log("done", notes)
                res.send('hello world?')
        })
            .catch((err) => res.status(500).json(err));
    }

    delete(req, res) {
        console.log("delete",req.params.id)
        return this.noteService
            .removeNote(req.params.id)
            .then(() => this.noteService.getNote(req.auth.user))
            .then((notes) => {
                // console.log('delete',notes)
                res.send('deleted')
            })
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = NoteRouter;