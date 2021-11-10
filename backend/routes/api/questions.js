const express = require('express');
const asyncHandler = require('express-async-handler');
const {User, Question} = require('../../db/models')
const router = express.Router();


router.get('/', asyncHandler(async(req, res) => {
    const questions = await Question.findAll();
    return res.json(questions);
}));

router.post('/', asyncHandler(async(req, res) => {
    const {ownerId, title, description} = req.body;
    const newQ = await Question.create({ownerId, title, description});
    return res.json({newQ});
}));

router.delete('/:id(\\d+)', async (req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    if(question) {
        await question.destroy();
        res.status(204).end();
    }
})

module.exports = router;
