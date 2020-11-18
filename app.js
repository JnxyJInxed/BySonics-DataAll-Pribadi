//import package
var PORT = process.env.PORT || 3000;
//server
const express = require('express');
const app = express();
//database
const mongoose = require('mongoose');
//body parser
const bodyParser = require('body-parser');
//cors
const cors = require('cors');
//secret params
require('dotenv/config');

//MIDDLEWARE:
//cors: public access
app.use(cors());
//middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//import routes
const dataPPGRoute = require ('./routes/dataPPG');
const dataAcceRoute = require ('./routes/dataAccelerometer')
const dataEKGRoute = require ('./routes/dataEKG')
const dataEMGRoute = require ('./routes/dataEMG')
const dataSuhuRoute = require ('./routes/dataSuhu')
const dataCameraRoute = require ('./routes/dataImage')
const recordingStatus = require('./routes/RecordingStatus')
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/dataPPG', dataPPGRoute);
app.use('/dataAccelerometer', dataAcceRoute);
app.use('/dataEKG', dataEKGRoute);
app.use('/dataEMG', dataEMGRoute);
app.use('/dataSuhu', dataSuhuRoute);
app.use('/dataImage', dataCameraRoute);
app.use('/recording', recordingStatus);
//ROUTE: neghubungin ke post dan get dkk
app.get('/', (req,res) => {
	res.send('BySonics Home Base Server');
});


//Connect to DB
mongoose.connect(
	process.env.DB_CONNECT_URL,  
	{useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connect to DB moongoose compass'),
);
// const dbBySonics = db.db('BySonics');
// const collectionUser = dbBySonics.collection(User);


//start LISTEN AT PORT:
app.listen(PORT, function () {
	console.log('Server running');
});