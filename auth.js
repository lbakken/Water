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

<<<<<<< HEAD
passport.serializeUser(function(user, done) {
    alert('called serializeUser')
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    alert('called deserializeUser')
    knex.select().from('users').where({ id }).timeout(3000, {cancel: true}).then((user) => {
=======
passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (id, done) {
    knex.select().from('users').where({ id }).timeout(1000, { cancel: true }).then((user) => {
>>>>>>> ca58b4099a2e1b37b8a409c36c3d5a863ea76e02
        if (err) { return done(err) }
        else { done(null, user) }
    });
});

<<<<<<< HEAD
passport.use(new Strategy(
    function(username, password, done) {
      knex.select().from('users').where({ username }).timeout(3000, {cancel: true}).then((user) => {
        if (err) { 
            alert('error on request')
            return done(err) }
        else if (!user) {
            alert('user not found')
            return done(null, false, { message: 'Incorrect username.' })
        }
        else if (!bcrypt.compareSync(password, user.password)) {
            alert('password incorrect')
            return done(null, false, { message: 'Incorrect password.' })
        }
        else { 
            alert('success!')
            return done(null, user, { message: 'Successful login.' }) }
      })
    }
));

function isOpenUsername(username) {
    alert('called isOpenUsername')
    knex.select().from('users').where({ username }).timeout(3000, {cancel: true}).then((user) => {
        if (err) { return done(err) }
        else if (user) { return false }
        else { return true }
    })
}

function createUser(req) {
    alert('called createUser')
    var salt = bcrypt.genSaltSync();
    var hash = bcrypt.hashSync(req.body.password, salt);
    var create = new Date();
    return knex('users').insert({
        username: req.body.username,
        password_salt: salt,
        password_hash: hash,
        email: req.body.email,
        created: create
    }).returning('*');
}

function loginRequired(req, res, next) {
    alert('called loginRequired')
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return next();
}

module.exports = {
    passport,
    createUser,
    loginRequired,
    isOpenUsername
}
=======
passport.use(new Strategy(function (username, password, done) {
    knex.select().from('users').where({ username }).timeout(1000, { cancel: true }).then((user) => {
        user = user[0];
        console.log(!bcrypt.compareSync(password, user.password_hash));
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
        }
        if (!bcrypt.compareSync(password, user.password_hash)) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        else { return done(null, user, { message: 'Successful login.' }) }

    }).catch(function (error) {
        return done(error);
    })

}));
>>>>>>> ca58b4099a2e1b37b8a409c36c3d5a863ea76e02
