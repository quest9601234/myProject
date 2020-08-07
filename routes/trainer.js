const express = require('express');
const router = express.Router();
const Trainer = require('./../models/trainer');
const multer = require('multer');
const path = require('path');
const trainer = require('./../models/trainer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/new', (req, res) => {
    res.render('trainers/new', { trainer: new Trainer() });
});


router.get('/edit/:id', async (req, res) => {
    const trainer = await Trainer.findById(req.params.id);
    res.render('trainers/edit', { trainer: trainer });
});

router.get('/:id', async (req, res) => {
    const trainer = await Trainer.findById(req.params.id).exec();
    if (trainer == null) {
        return res.redirect('/');
    }
    res.render('trainers/show', { trainer });

});

router.post('/', upload.single('avatar'), async (req, res, next) => {
    let trainer = new Trainer({
        ...req.body,
        avatar: req.file ? req.file.originalname : null
    });
    try {
        await trainer.save();
        res.redirect(`/trainer/${trainer.id}`);
    } catch (err) {
        console.log(err);
    }
});


router.put('/:id', upload.single('avatar'), async (req, res, next) => {
    try {
        await trainer.update({ _id: req.params.id }, { $set: { ...req.body, avatar: req.file && req.file.originalname } }, { upsert: true })
        res.redirect(`/trainer/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
});


router.delete('/:id', async (req, res) => {
    await Trainer.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;