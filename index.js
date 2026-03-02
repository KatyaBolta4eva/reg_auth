const express = require('express');
const chalk = require('chalk')
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const  auth = require('./middlewares/auth');
const {addNote, getNotes} = require('./notes.controller')
const {loginUser} = require('./users.controller');

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/login', async (req, res) => {
    res.render('login', {
        title: 'Вход для операторов',
        error: undefined
    })
})

app.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);

        res.cookie('token', token, {httpOnly: true})

        res.redirect('/admin');
    } catch (e) {
        res.render('login', {
            title: 'Вход для операторов',
            error: e.message
        })
    }
})

app.get('/logout', (req, res) => {
    res.cookie('token', '', {httpOnly: true})
    res.redirect('/login')
})


app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Запись к врачу',
        notes: await getNotes(),
        created: false,
        error: false
    })
})

app.post('/', async (req, res) => {
    try {
        await addNote(req.body.fio, req.body.phone, req.body.problem, 'Гость')
        res.render('index', {
            title: 'Запись к врачу',
            notes: await getNotes(),
            created: true,
            error: false
        })
    } catch (e) {
        console.error('Creation error', e)
        res.render('index', {
            title: 'Запись к врачу',
            notes: await getNotes(),
            created: false,
            error: true
        })
    }
})

app.use(auth)

app.get('/admin', async (req, res) => {
    res.render('admin', {
        title: 'Все заявки',
        notes: await getNotes(),
        userEmail: req.user.email
    })
})

mongoose.connect('mongodb+srv://catbolta4eva_db_user:cat123123@cluster0.n0cxhau.mongodb.net/notes?appName=Cluster0'
).then(() => {
    console.log('Connected to mongodb')
    app.listen(port, () => {
        console.log(chalk.default.blue(`Server has been started on port ${port}...`))
    })
})
