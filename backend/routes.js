const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models.js').Player;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

router.get('/', (req, res) => {
  Player.find()
    .where('pa').gt(149)
    .sort({pa: -1})
    .then(players => {
      console.log('get /', players.length);
      // dummy weightings (add to 10)
      const weightings = JSON.parse(req.query.weightings);

      var highsAndLows = {"obp": {'high': 0.0, 'low': 1.0},
                          "slg": {'high': 0.0, 'low': 4.0},
                          "soRate": {'high': 0.0, 'low': 1.0},
                          "bbRate": {'high': 0.0, 'low': 1.0},
                          "sbPct": {'high': 0.0, 'low': 1.0},
                          "sb": {'high': 0, 'low': 200},
                          "ba": {'high': 0.0, 'low': 1.0},
                          "hrRate": {'high': 0.0, 'low': 1.0},
                          "rbi": {'high': 0, 'low': 300} };
      players.forEach((player, index, playersArr) => {
        var newPlayer = Object.assign({}, player._doc);
        // check for possible divide by zero
        if (player.ab === 0) {
          newPlayer.slg = 0.0;
          newPlayer.ba = 0.0;
        } else {
          newPlayer.slg = player.tb / player.ab;
          newPlayer.ba = player.h / player.ab;
        }

        if (player.pa === 0) {
          newPlayer.obp = 0.0;
          newPlayer.soRate = 0.0;
          newPlayer.bbRate = 0.0;
          newPlayer.hrRate = 0.0;
        } else {
          newPlayer.obp = (player.h + player.hbp + player.bb) / player.pa;
          newPlayer.soRate = player.so / player.pa;
          newPlayer.bbRate = player.bb / player.pa;
          newPlayer.hrRate = player.hr / player.pa;
        }

        if ((player.sb + player.cs) === 0) {
          newPlayer.sbPct = 0.0;
        } else {
          newPlayer.sbPct = player.sb / (player.sb + player.cs);
        }
        playersArr[index] = newPlayer;
        // check for qualified hitters
        if (player.pa >= 150) {
          Object.keys(highsAndLows).forEach(stat => {
            if (stat === "soRate") {
              if (newPlayer.soRate > highsAndLows.soRate.low) {
                highsAndLows.soRate.low = newPlayer.soRate;
              } else if (newPlayer.soRate < highsAndLows.soRate.high) {
                highsAndLows.soRate.high = newPlayer.soRate;
              }
            } else {
              if (newPlayer[stat] > highsAndLows[stat].high) {
                highsAndLows[stat].high = newPlayer[stat];
              } else if (newPlayer[stat] < highsAndLows[stat].low) {
                highsAndLows[stat].low = newPlayer[stat];
              }
            }
          });
        }
        // if (player.name === "Matt Joyce" || player.name === "Alex Avila" || player.name === "Bryce Harper") {
        //   console.log(newPlayer);
        // }
      });


      var newPlayers = [];
      players.forEach(player => {
        var playerRelativeValues = {};
        Object.keys(highsAndLows).forEach(stat => {
          // turn stat into a number relative to league using high and low
          playerRelativeValues[stat] = (player[stat] - highsAndLows[stat].low) / (highsAndLows[stat].high - highsAndLows[stat].low);
        });
        var ovo = 0.0;
        Object.keys(playerRelativeValues).forEach(stat => {
          ovo = ovo + (playerRelativeValues[stat] * weightings[stat]);
        });

        const newPlayer = Object.assign({}, player);

        newPlayer.ovo = +((ovo / 10).toFixed(2));
        newPlayers.push(newPlayer);
      });
      // sort by desc ovo
      newPlayers.sort((a, b) => (b.ovo - a.ovo));
      // rank each player by ovo after sorting
      const sortedRankedPlayers = newPlayers.map((player, idx) => {
        return Object.assign({rank: idx + 1}, player);
      });
      res.json(sortedRankedPlayers);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
