//loading express
let express = require('express');
// let bodyParser = require('body-parser');
let path = require('path');
//loading the api
let api = require('./routes/api');

//defining the Port no
const port = process.env.PORT || 3000;

let app = express();
//let the bodyParser to use HTML form Data
 //app.use(bodyParser.urlencoded({extended:true}));
//let the bodyParser to use JSON data
 app.use(express.json());
 //enabling the cors
//  app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
//     next();
//   });
app.use('/api',api);

//testing the express 
app.get('*',(req,res)=>{
    //res.send("<h1>Welcome to Express</h1>");
    //SENDING A STATIC HTML FILE
    res.sendFile(path.join(__dirname,'angular/index.html'));
});

//listening to port no
app.listen(port,()=>{
    console.log(`Server has started ${port}`);
});


