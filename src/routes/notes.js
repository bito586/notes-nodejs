const express = require('express')
const router = express.Router()

const noteController = require('../controllers/noteController')
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes', isAuthenticated, noteController.index)
router.get('/notes/create', isAuthenticated, noteController.create)
router.get('/notes/:id', isAuthenticated, noteController.show)
router.post('/notes', isAuthenticated, noteController.store)
router.get('/notes/:id/edit', isAuthenticated, noteController.edit)
router.put('/notes/:id', isAuthenticated, noteController.update)
router.delete('/notes/:id', isAuthenticated, noteController.destroy)

module.exports = router