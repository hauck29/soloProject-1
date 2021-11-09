const router = require('express').Router();


const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });


module.exports = router;
