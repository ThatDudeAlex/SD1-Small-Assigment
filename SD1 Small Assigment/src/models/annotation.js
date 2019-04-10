const mongoose = require('mongoose');

const Annotation = mongoose.model('Annotation', {
  timestamp: {
    type: Number,
    required: true
  },
  owner: {
    //type: mongoose.Schema.Types.ObjectId,
    type: Number,
    required: true,
    ref: 'Player'
  }
});

module.exports = Annotation;
