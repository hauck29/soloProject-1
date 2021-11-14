const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Answer, Question } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check, validationResult } = require('express-validator');


const validateQuestion = [
  check('title')
    .not().isEmpty()
    .withMessage('You must enter a title for the question'),

  check('description')
    .not().isEmpty()
    .withMessage('You must enter a description for the question'),

  handleValidationErrors
];

//getting the questions list
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll({
      include: [{model: User}, {model: Answer}]
    });
    return res.json(questions);
  })
);

//query for finding one question, by id
router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
  const question = await Question.findByPk(req.params.id)
  return res.json({question});
}));

//posting a new question to the feed
router.post(
  "/",
  requireAuth,
  validateQuestion,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { ownerId, title, description } = req.body;
    const newQ = await Question.create({ ownerId, title, description });
    return res.json({ newQ });
  })
);

//edit question in the feed
router.put(
  "/:id(\\d+)",
  requireAuth,
  validateQuestion,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const editquestion = await Question.findByPk(req.params.id);
    await editquestion.update({ title, description });
    const editQ = await Question.findByPk(req.params.id, { include: User });
    return res.json({ editQ });
  })
);

//deleting a question from the feed
router.delete(
  "/:id(\\d+)",
  requireAuth,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.destroy();
      res.status(200).end();
    }
  })
);

module.exports = router;
