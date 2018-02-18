const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models.js').Player;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

console.log('route guidance commencing!');

mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

router.get('/', (req, res) => {
  Player.find()
    .sort({h: -1})
    .then(players => {
      // dummy weightings (add to 10)
      const weightings = {"obp": 3.0,
                          "slg": 3.0,
                          "soRate": 0.7,
                          "bbRate": 0.4,
                          "sbPct": 0.5,
                          "sb": 0.6,
                          "ba": 0.7,
                          "hrRate": 0.8,
                          "rbi": 0.3 };

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
        console.log(player);
        // check for qualified hitters
        if (player.pa >= 150) {
          var newPlayer = Object.assign({}, player._doc);

          newPlayer.obp = (player.h + player.hbp + player.bb) / player.pa;
          newPlayer.slg = player.tb / player.ab;
          newPlayer.soRate = player.so / player.pa;
          newPlayer.bbRate = player.bb / player.pa;
          if ((player.sb + player.cs) === 0) {
            newPlayer.sbPct = 0.0;
          } else {
            newPlayer.sbPct = player.sb / (player.sb + player.cs);
          }
          newPlayer.ba = player.h / player.ab;
          newPlayer.hrRate = player.hr / player.pa;
          playersArr[index] = newPlayer;

          Object.keys(highsAndLows).forEach(stat => {
            if (newPlayer[stat] > highsAndLows[stat].high) {
              highsAndLows[stat].high = newPlayer[stat];
            } else if (newPlayer[stat] < highsAndLows[stat].low) {
              highsAndLows[stat].low = newPlayer[stat];
            }
          });
        }
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

        newPlayer.ovo = ovo;
        newPlayers.push(newPlayer);
      });
      res.json(newPlayers);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

// router.get('/', (req, res) => {
//   Player.find()
//     .sort({h: -1})
//     .then(players => {
//       res.json(players);
//     })
//     .catch(err => {
//       res.send(err)
//     })
// })

module.exports = router;
