const express = require('express');
const Annotation = require('../models/annotation');
const router = new express.Router();

router.post('/annotations', async (req, res) => {
  const annotation = new Annotation(req.body);

  try {
    await annotation.save();
    res.status(201).send(annotation);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/annotations', async (req, res) => {
  try {
    const annotations = await Annotation.find({});
    res.send(annotations);
  } catch (e) {
    res.status(500).send();
  }

});

router.get('/annotations/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const annotation = await Annotation.findById(_id);

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
