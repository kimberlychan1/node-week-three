const AuthChallenger = function (knex) {
    return function (username, password, cb) {
        let query = knex
            .select('username')
            .from('users')
            .where('password', password)

        query
            .then((rows) => {
                // console.log(rows)
                if (rows.length === 1) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
            })
            .catch((err) => {
                console.log(err)
            });
    };
}

module.exports = AuthChallenger;