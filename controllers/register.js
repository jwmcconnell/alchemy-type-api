const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
      })
      .then(user => {
        return trx('stats')
          .returning('*')
          .insert({
            user_id: user[0].id,
            passages: 0,
            avg_wpm: 0,
            avg_errors: 0
          });
      })
      .then(user => {
        res.status(200).json(user[0].user_id);
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('Unable to register.'))
}

module.exports = {
  handleRegister: handleRegister
};