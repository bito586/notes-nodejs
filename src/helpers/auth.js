const Auth = {}

Auth.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'Not authorized')
    res.redirect('/signin')
}

module.exports = Auth