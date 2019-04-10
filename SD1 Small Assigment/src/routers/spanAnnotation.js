const express = require('express');
const SpanAnnotation = require('../models/spanAnnotation');
const router = new express.Router();

router.post('/spanAnnotations', async (req, res) => {
  const annotation = new SpanAnnotation(req.body);

  try {
    await annotation.save();
    res.status(201).send(annotation);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.get('/spanAnnotations', async (req, res) => {
  try {
    const annotations = await SpanAnnotation.find({});
    res.send(annotations);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/spanAnnotations/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const annotation = await SpanAnnotation.findById(_id);

    // no annotation with this id exists
    if(!annotation) {
      return res.status(404).send();
    }

    res.send(annotation);
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = router;
