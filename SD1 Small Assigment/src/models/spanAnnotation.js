const mongoose = require('mongoose');

const SpanAnnotation = mongoose.model('SpanAnnotation', {
  startTimestamp: {
    type: Number,
    required: true
  },
  endTimestamp: {
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

module.exports = SpanAnnotation;
