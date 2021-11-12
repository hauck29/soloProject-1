const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Question, Answer } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

//getting the answers list
//make 2 queries
//1 to get the question the answers are for
//2 to get the answers for that question
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const questionId = parseInt(req.params.id);
    const question = await Question.findByPk(questionId);

    const answers = await Answer.findAll({
      where: { questionId: questionId },
    }).then((res) => {
      return res.map((row) => {
        return row.dataValues;
      });
    });

    console.log("get answers route");
    res.json({ question, answers });
  })
);

//post a new answer to a question
router.post(
  "/",
  requireAuth,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { userId, questionId, answer } = req.body;
    const newA = await Answer.create({ userId, questionId, answer });
    return res.json({ newA });
  })
);

//edit answer to a question
router.put(
    "/:id(\\d+)",
    requireAuth,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
      const { answer } = req.body;
      const editanswer = await Answer.findByPk(req.params.id);
      await editanswer.update({ answer });
      const editA = await Answer.findByPk(req.params.id, { include: User });
      return res.json({ editA });
    })
  );

//deleting an answer from a question
router.delete(
  "/:id(\\d+)",
  requireAuth,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      await answer.destroy();
      res.status(200).end();
    }
  })
);

module.exports = router;
