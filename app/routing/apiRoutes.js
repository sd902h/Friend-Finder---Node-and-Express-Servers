var friendsList = require("../data/friends.js");

function findCompatibility(userOneScores, userTwoScores) {
  var tally = 0;

  for (var i = 0; i < userOneScores.length; i++) {
    var firstUserElement = userOneScores[i];
    var secondUserElement = userTwoScores[i];

    var comparison = Math.abs(firstUserElement - secondUserElement);
    tally += comparison;
  }

  return tally;
}
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friends", function(req, res) {
    var LastFriend = req.body;
    friendsList.push(LastFriend);
    var friendScore = LastFriend.scores;

    var match = [];
    for (var i = 0; i < friendsList.length - 1; i++) {
      var tallyResult = findCompatibility(friendScore, friendsList[i].scores);
      match.push(tallyResult);
    }
    console.log(Math.min(...match));

    res.json("true");
  });
};
