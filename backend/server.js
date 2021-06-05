//loading express
let express = require('express');
// let bodyParser = require('body-parser');
let path = require('path');
//loading the api
let api = require('./routes/api');

//defining the Port no
const port = process.env.PORT || 3000;

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 //enabling the cors
//  app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
//     next();
//   });
app.use('/', express.static(path.join(__dirname, './angular')));
app.use('/api',api);

//listening to port no
app.listen(port,()=>{
    console.log(`Server has started ${port}`);
});


