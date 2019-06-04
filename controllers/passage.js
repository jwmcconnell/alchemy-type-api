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

const handleGetPassages = (req, res, db) => {
  const userId = req.userId;
  if (userId) {
    db.select("*")
      .from("passages")
      .then(passages => {
        console.log(passages);
        res.json(passages);
      })
  }
}

const handleGetPassage = (req, res, db) => {
  const userId = req.userId;
  const id = req.params.id;
  if (userId) {
    db.select("*")
      .from("passages")
      .where("id", id)
      .then(passage => {
        res.json(passages);
      })
  }
}

module.exports = {
  handleAddPassage: handleAddPassage,
  handleGetPassages: handleGetPassages,
  handleGetPassage: handleGetPassage
};
