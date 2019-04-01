const express = require('express');
require('./db/mongoose');

const playerRouter = require('./routers/player');
const annotationRouter = require('./routers/annotation');
const spanAnnotationRouter = require('./routers/spanAnnotation');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(playerRouter);
app.use(annotationRouter);
app.use(spanAnnotationRouter);



app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
