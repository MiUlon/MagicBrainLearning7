import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handelRegister } from './Controllers/handelRegister.js';
import { handelProfile } from './Controllers/handelProfile.js';
import { handelImage, handleApiCall } from './Controllers/handelImage.js';
import { handelSignin} from './Controllers/handelSignin.js';

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

app.get('/', (req, res) => { res.json(database.users) });
app.post('/signin', (req, res) => { handelSignin(req, res, bcrypt, postgresDB) });
app.post('/register', (req, res) => { handelRegister(req, res, bcrypt, postgresDB) });
app.get('/profile/:id', (req, res) => { handelProfile(req, res, postgresDB) });
app.put('/image', (req, res) => { handelImage(req, res, postgresDB) });
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(3001, console.log('Server is running on 3001 port.'));