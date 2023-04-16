import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

const postgresDB = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'MagicBrainLearning7'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'Mindaugas',
            email: 'Mindaugas@gmail.com',
            password: 'Mindaugas',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Mindaugas2',
            email: 'Mindaugas2@gmail.com',
            password: 'Mindaugas2',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '01',
            email: 'Mindaugas@gmail.com',
            hash: ''
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    bcrypt.compare("Mindaugas", '$2a$10$NeHU8Sh1/Lp.hGIGIuKtJe//FBwhh6/6DSRwD26mdMvDclY6Fd.lG', function(err, res) {
        console.log('Password correct.')
    });
    bcrypt.compare("veggies", '$2a$10$NeHU8Sh1/Lp.hGIGIuKtJe//FBwhh6/6DSRwD26mdMvDclY6Fd.lG', function(err, res) {
        console.log('Password incorrect.')
    });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('Cannot log in');
        }
});

app.post('/register', (req, res) => {
    const {name, email, password } = req.body;
    bcrypt.hash("bacon", null, null, function(err, hash) {
        console.log(hash); // $2a$10$NeHU8Sh1/Lp.hGIGIuKtJe//FBwhh6/6DSRwD26mdMvDclY6Fd.lG
    });
    database.users.push({
        id: database.users.length+1,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    return res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            res.json(user);
        };
    });
    if (!found) {
        res.status(404).json('User was not found');
    };
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            res.json(user.entries);
        };
    });
    if (!found) {
        res.status(404).json('User was not found');
    };
});

app.listen(3001, console.log('Server is running on 3001 port.'));