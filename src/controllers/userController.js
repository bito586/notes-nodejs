const User = require('../models/User')
const passport = require('passport')

const UserController = {}

UserController.index = async (req, res) => {
    res.render('users/signin')
}

UserController.signin = passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/signin',
    failureFlash: true
})

UserController.show = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)

    res.render('users/show', {user})
}

UserController.create = (req, res) => {
    res.render('users/signup')
}

UserController.store = async (req, res) => {
    const { email, name, password, confirmPassword } = req.body
    const errors = []

    if(!email)              errors.push({text: 'Email can not be empty'})
    if(!name)               errors.push({text: 'Name can not be empty'})
    if(!password)           errors.push({text: 'Password can not be empty'})
    if(password.length < 6) errors.push({text: 'Password must be at least 6 characters'})

    const emailRepeted = await User.find({email: email})

    if(emailRepeted.length) errors.push({text: 'The Email is already in use'})

    if(errors.length) {
        res.render('users/signup', { errors, email, name })
    } else {
        const user = new User({ email, name, password })

        user.password = await user.encryptPassword(password)

        await user.save()

        req.flash('success_message', 'User created correctly')
        res.redirect('/signin')
    }
}

UserController.edit = async (req, res) => {
    const id = req.params.id
    const note = await Note.findById(id)

    res.render('users/edit', {note})
}

UserController.update = async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body

    await Note.findByIdAndUpdate(id, { title, description })

    req.flash('success_message', 'Note updated correctly')
    res.redirect('/users/' + id + '/edit')
}

UserController.destroy = async (req, res) => {
    const id = req.params.id

    await Note.findByIdAndDelete(id)

    req.flash('success_message', 'Note deleted correctly')
    res.redirect('/users')
}

UserController.signout = (req, res) => {
    req.logout()
    res.redirect('/')
}

module.exports = UserController