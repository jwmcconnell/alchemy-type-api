const handleAddPassage = (req, res, db) => {
  const userId = req.userId;
  const passage = req.body.passage;
  console.log(userId, passage);
  if (userId) {
    db.transaction(trx => {
      trx
        .insert({
          title: passage.title,
          content: passage.content,
          description: passage.description,
          created: new Date()
        })
        .into("passages")
        .returning("id")
        .then(id => {
          res.json(id);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json("Unable to add passage."));
  }
};

module.exports = {
  handleAddPassage: handleAddPassage
};
