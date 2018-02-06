const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  position: String,
  pa: Number,
  ab: Number,
  h: Number,
  hr: Number,
  tb: Number,
  bb: Number,
  rbi: Number,
  r: Number,
  sb: Number,
  cs: Number,
  hbp: Number,
  sac: Number,
  so: Number,
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// playerSchema.virtual('ba').get(() => (this.h/this.ab));

const Player = mongoose.model('players', playerSchema, 'players');

module.exports = {
  Player: Player
};
