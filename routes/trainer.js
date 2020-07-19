const express = require('express');
const Trainer = require('./../models/trainer');
const trainer = require('./../models/trainer');

const router = express.Router();

router.get('/new', (req, res) => {
    res.render('trainers/new', { trainer: new Trainer() });
});
router.get('/:id', async (req, res) => {
    const trainer = await Trainer.findById(req.param.id);
    // if(trainer == null) res.redirect('/');
    res.render('trainers/show', { trainer: trainer });
});

router.post('/', async (req, res) => {
    let trainer = new Trainer({
        nameTrainer: req.body.nameTrainer,
        project: req.body.project,
        review: req.body.review
    })
    try {
        trainer = await trainer.save();
        res.redirect(`/trainer/${trainer.id}`);
    } catch (e) {
        console.log(e);
        res.render('/trainers/new', { trainer: trainer });
    }
});



module.exports = router;