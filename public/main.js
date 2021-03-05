const writeNote = $('#write-note');
const addBtn = $('#addBtn');
const newNote = $('.new-note');
const delBtn = $('.delBtn');

$(document).ready(() => {
    console.log('document running')
    axios
        .get('/api/notes')
        .then((res) => {
            console.log("axios get notes");
        })
        .catch((err) => {
            console.log("axios get err", err);
        });

    addBtn.submit((e) => {
        e.preventDefault();
        axios
            .post('/api/notes', {
                note: writeNote.val(),
            })
            .then((res) => {
                console.log("axios post note", res.data);
            })
            .catch((err) => {
                console.log("axios post err", err);
            });
    });

    newNote.focusout((e) => {
        e.preventDefault();
        axios
            .put(`/api/notes/${e.currentTarget.dataset.textarea}`, {
                comment: $(e.currentTarget).val(),
            })
            .then((data) => {
                console.log("put success", data);
            })
            .catch((err) => {
                console.log("newNote err", err);
            });
    });

    delBtn.click((e) => {
        e.preventDefault();
        console.log("delBtn pressed")
        axios
            .delete(`/api/notes/${e.currentTarget.dataset.delbtn}`)
            .then(() => {
                console.log("delBtn id")
                window.location.reload()
            })
            .catch((err) => {
                console.log("delBtn err", err)
            });
    });
})
