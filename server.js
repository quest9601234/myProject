const express = require('express');
const mongoose = require('mongoose');
const trainerRouter = require('./routes/trainer');
const app = express();

mongoose.connect('mongodb+srv://quest96_01234:155012345@cluster0.k0u38.mongodb.net/trainerDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');//convert ejs to html


app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    const trainers = [
        {
            nameTrainer: 'vu van thuyen',
            project: 'abc',
            review: 'bi thu dang'
        },
        {
            nameTrainer: 'vu van lap',
            project: 'def',
            review: 'thuc tap sinh usol'
        },
        {
            nameTrainer: 'HA VU DAT',
            project: 'cong trinh thuy',
            review: 'thuc tap o hung yen'
        },
        {
            nameTrainer: 'nguyen van anh',
            project: 'react',
            review: 'thuc tap sinh infore'
        },
        {
            nameTrainer: 'truong thanh thien',
            project: 'vlog',
            review: 'thuc tap sinh usol'
        }
    ]
    res.render('trainers/index', { trainers: trainers });
});


app.use('/trainer', trainerRouter);

app.listen(5000);