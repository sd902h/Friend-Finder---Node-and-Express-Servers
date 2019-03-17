var friendsList = require("../data/friends.js");

function findCompatibility(userOneScores, userTwoScores, name, photo) {
  var tally = {
    count: 0,
    name: name,
    photo: photo
  };

  for (var i = 0; i < userOneScores.length; i++) {
    var firstUserElement = userOneScores[i];
    var secondUserElement = userTwoScores[i];

    var comparison = Math.abs(firstUserElement - secondUserElement);
    tally.count += comparison;
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
      var tallyResult = findCompatibility(
        friendScore,
        friendsList[i].scores,
        friendsList[i].name,
        friendsList[i].photo
      );
      match.push(tallyResult);
    }

    var minimum = match[0].count;
    var minimumMatch = {};
    for (var i = 1; i < match.length; i++) {
      if (match[i].count < minimum) {
        minimum = match[i].count;
        minimumMatch = match[i];
      }
    }

    console.log(minimum);
    console.log(match);

    res.json(minimumMatch);
  });
};
