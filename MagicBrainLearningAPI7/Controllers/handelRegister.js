export const handelRegister = (req, res, bcrypt, postgresDB) => {
    const {name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('Incorrect form submition')
    }
    const hash = bcrypt.hashSync(password);
    postgresDB.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(error => res.status(400).json('Cannot register'))
};