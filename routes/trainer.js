const express = require('express');
const Trainer = require('./../models/trainer');
//const trainer = require('./../models/trainer');



const router = express.Router();

router.get('/new', (req, res) => {
    res.render('trainers/new', { trainer: new Trainer() });
});


router.get('/edit/:id', async (req, res) => {
    const trainer = await Trainer.findById(req.params.id);
    res.render('trainers/edit', { trainer: trainer });
});

router.get('/:id', async (req, res) => {
    //console.log(req.params);
    //const trainer = "abc";
    const trainer = await Trainer.findById(req.params.id);
    if (trainer == null) {
        return res.redirect('/');
    }
    res.render('trainers/show', { trainer: trainer });

});

router.post('/', async (req, res, next) => {
    req.trainer = new Trainer();
    next();
},saveTrainerAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.trainer = await Trainer.findById(req.params.id);
    next();
},saveTrainerAndRedirect('edit'));


router.delete('/:id', async (req, res) => {
    await Trainer.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveTrainerAndRedirect(path) {
    return async (req, res) => {
        let trainer = req.trainer;
        trainer.nameTrainer = req.body.nameTrainer;
        trainer.project = req.body.project;
        trainer.review = req.body.review;


        try {
            trainer = await trainer.save();
            res.redirect(`/trainer/${trainer.id}`);
        } catch (e) {
            console.log(e);
            res.render(`trainers/${path}`, { trainer: trainer });
        }
    }
}

module.exports = router;