const handleGetStats = (req, res, db) => {
  const userId = req.userId;
  if (userId) {
    db.select("*")
      .from("stats")
      .where({
        user_id: userId
      })
      .then(stats => {
        console.log(stats);
        if (stats.length) {
          console.log(stats);
          res.json(stats[0]);
        } else {
          res.status(400).json("Not found");
        }
      })
      .catch(err => res.status(400).json("error getting stats"));
  }
};

module.exports = {
  handleGetStats: handleGetStats
};
