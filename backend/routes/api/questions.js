const express = require('express');
const asyncHandler = require('express-async-handler');
const {User, Question} = require('../../db/models')
const router = express.Router();
const {requireAuth} = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');

//getting the questions list
router.get('/', asyncHandler(async(req, res) => {
    const questions = await Question.findAll();
    return res.json(questions);
}));



//posting a new question to the feed
router.post('/', requireAuth, handleValidationErrors,
    asyncHandler(async(req, res) => {
        const {ownerId, title, description} = req.body;
        const newQ = await Question.create({ownerId, title, description});
        return res.json({newQ});
}));

//edit question in the feed
router.put('/:id(\\d+)', handleValidationErrors,
    asyncHandler(async(req, res) => {
        const {title, description} = req.body;
        const editQ = await Question.findByPk(req.params.id);
        await editQ.update({title, description});
        return res.json({editQ});
    }));

//deleting a question from the feed
router.delete('/:id(\\d+)', requireAuth, handleValidationErrors, asyncHandler( async (req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    if(question) {
        await question.destroy();
        res.status(200).end();
    }
}));

module.exports = router;
