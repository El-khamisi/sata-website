//import dependencies
const router = require('express').Router();
const {multer} = require('../../config/multer');

//middlewares
const { authN } = require('../../middlewares/authN');
const { isManager } = require('../../middlewares/authZ');

// controllers
const { readAssistants, readAssistant, addAssistant, editAssistant, deleteAssistant } = require('../agency/manager.controller');

//Managers Routes -- Assistants  --> /dashboard/agency
router.get('/assistants', authN, isManager, readAssistants);
router.get('/assistant/:id', authN, isManager, readAssistant);
router.post('/assistant', authN, isManager, multer.single('image'), addAssistant);
router.put('/assistant/:id', authN, isManager, multer.single('image'), editAssistant);
router.delete('/assistant/:id', authN, isManager, deleteAssistant);

module.exports = router;
