const Note = require('../models/Note')

const NoteController = {}

NoteController.index = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'})
    res.render('notes/index', {notes})
}

NoteController.show = async (req, res) => {
    const id = req.params.id
    const note = await Note.findById(id)
    res.render('notes/show', {note})
}

NoteController.create = (req, res) => {
    res.render('notes/create')
}

NoteController.store = async (req, res) => {
    const { title, description } = req.body
    const errors = []

    if(!title) errors.push({text: 'Please type a title'})
    if(!description) errors.push({text: 'Please type a description'})

    if(errors.length) res.render('notes/create', {
        errors,
        title,
        description
    })
    else {
        const note = new Note({ title, description })
        note.user = req.user.id
        await note.save()
        req.flash('success_message', 'Note created correctly')
        res.redirect('/notes/create')
    }
}

NoteController.edit = async (req, res) => {
    const id = req.params.id
    const note = await Note.findById(id)
    res.render('notes/edit', {note})
}

NoteController.update = async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body
    await Note.findByIdAndUpdate(id, { title, description })
    req.flash('success_message', 'Note updated correctly')
    res.redirect('/notes/' + id + '/edit')
}

NoteController.destroy = async (req, res) => {
    const id = req.params.id
    await Note.findByIdAndDelete(id)
    req.flash('success_message', 'Note deleted correctly')
    res.redirect('/notes')
}

module.exports = NoteController