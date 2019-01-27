const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use(new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email',
    passReqToCallback : true
}, async (req, username, password, done) => {
    const user = await User.findOne({email: username})

    if(!user) return done(null, false, { message: 'Not user found'})
    else {
        const match = await user.matchPassword(password)

        if(match)   return done(null, user)
        else        return done(null, false, { message: 'Incorrect password' })
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        done(error, user)
    })
})