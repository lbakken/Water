var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs')
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-107-20-183-142.compute-1.amazonaws.com',
        port: '5432',
        user: 'gyiklnogoftxaw',
        password: '4ed2c78146de60f01e360a7dd390b3dbdee012f09d7e45cdd42dbd531ba46afe',
        database: 'd9jgpghedbvma3',
        ssl: true
    }
})

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (id, done) {
    knex.select().from('users').where({ id }).timeout(1000, { cancel: true }).then((user) => {
        if (err) { return done(err) }
        else { done(null, user) }
    });
});

passport.use(new Strategy(function (username, password, done) {
    knex.select().from('users').where({ username }).timeout(1000, { cancel: true }).then((user) => {
        user = user[0];
        let inPass = bcrypt.hashSync(password, user.password_salt);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
        }
        if (inPass == user.passport_hash) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        else { return done(null, user, { message: 'Successful login.' }) }

    }).catch(function (error) {
        return done(error);
    })

}));
