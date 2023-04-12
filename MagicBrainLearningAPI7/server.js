import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

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
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('Success');
        } else {
            res.status(404).json('Cannot log in');
        }
});

app.post('/register', (req, res) => {
    const {name, email, password } = req.body;
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

app.listen(3001, console.log('Server is running on 3001 port.'));