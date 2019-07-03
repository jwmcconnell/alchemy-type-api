const handleGetStats = (req, res, db) => {
  const userId = req.userId;
  if (userId) {
    db.select("*")
      .from("stats")
      .where({
        user_id: userId
      })
      .then(stats => {
        if (stats.length) {
          res.json(stats[0]);
        } else {
          res.status(400).json("Not found");
        }
      })
      .catch(err => res.status(400).json("error getting stats"));
  }
};

const handleSaveStats = (req, res, db) => {
  const stats = req.body.stats;
  const userId = req.userId;
  if (userId) {
    db.select("*")
      .from("stats")
      .where({
        user_id: userId
      })
      .then(currentStats => currentStats[0])
      .then(currentStats => {
        currentStats.passages++;
        currentStats.avg_wpm =
          (currentStats.avg_wpm * (currentStats.passages - 1) + stats.wpm) /
          currentStats.passages;
        currentStats.avg_errors =
          (currentStats.avg_errors * (currentStats.passages - 1) +
            stats.errorChars.length) /
          currentStats.passages;

        return db("stats")
          .where({ user_id: userId })
          .update({
            passages: currentStats.passages,
            avg_wpm: currentStats.avg_wpm,
            avg_errors: currentStats.avg_errors
          });
      });
  }
};

module.exports = {
  handleGetStats: handleGetStats,
  handleSaveStats: handleSaveStats
};
