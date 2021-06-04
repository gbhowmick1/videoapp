let express = require('express');
//including mongoose dependency
let mongoose = require('mongoose');
//include video model
let Video = require('../model/video');
//include users model
let User = require('../model/users');
//loding bcyptjs
let bcryptjs = require('bcryptjs');
//loading jsonwebtoken
let jwt = require('jsonwebtoken');
//loading the middleware check-auth.js
let checkAuth = require('../middleware/check-auth');

/*Testing Database Connection*/
//let db = "mongodb://mean:mean123@localhost:27017/videoDB";
/*connecting the cloud clever */
//let db="mongodb://udgmngqcjgo2fxmhfekv:yN4BMKPInFBhSS8llOqM@blc0lmcsuwnjlyt-mongodb.services.clever-cloud.com:27017/blc0lmcsuwnjlyt";

//connecting with mongo atlas
let db="mongodb+srv://goutam123:goutam123@goutambhowmick.pew7f.mongodb.net/videodb?retryWrites=true&w=majority";

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    if (err) throw err;
    else 
    console.log('Successfully Connected to MongoDB..');
});

//creating router Object of Express
let router = express.Router();

//getting all videos from mongoDB
router.get('/videos',checkAuth,(req,res)=>{
    Video.find({})
    .exec(function(err,data){
        if (err) res.status(200).json({'error ':err});
        else res.status(200).json(data);
    });
});
//getting a perticular video
router.get('/video/:id',(req,res)=>{

    Video.findById(req.params.id)
    .exec(function(err,data){
        if(err) res.status(200).json({'msg':'No Video found !!'});
        else res.status(200).json(data);
    });
});

//adding a post method for saving a new record to database
 router.post('/video',(req,res)=>{
     //create an Object of the Video model.
      let newVideo = new Video();
      newVideo.title = req.body.title;
      newVideo.url   = req.body.url;
      newVideo.description = req.body.description;

      newVideo.save((err,data)=>{

        if(err){
            res.status(200).json({'message':err});
        }
        else{
            res.status(201).json({'message':'One Video Added Successfully !'});
        }
      });

    });
//adding a put or patch request for updating video 
  router.patch('/video/:id',(req,res)=>{
      Video.findByIdAndUpdate(req.params.id,{
          $set:{'title':req.body.title,'url':req.body.url,'description':req.body.description}
      },{new:true},(err,data)=>{
               if(err){
                   res.status(200).json({'message':err});
               }else{
                   res.status(202).json({'message':'One Video Record Updated...'});
               }

      });

  });
  //adding delete request for deleting video
  router.delete('/video/:id',(req,res)=>{
      Video.findByIdAndRemove(req.params.id,(err,data)=>{
            if(err) res.status(200).json({'message':err});
            else res.status(202).json({'message':'One Video Deleted'});          
      });
  });

//user's  signUP routes
  router.post('/users/signup',(req,res)=>{
     //hashing the password field.
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(req.body.pass1,salt);

      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email= req.body.email;
      newUser.pass1= hash;

      newUser.save((err,data)=>{
          if(err){ res.status(200).json({'message':err});}
          else { res.status(201).json({'message':'Reagistration Done !'});}
      });
  });
  //adding signin routes
  router.post('/users/signin',(req,res)=>{
      //assume input field name from front end would be email
     let email = req.body.email; 
     User.find({'email':email}).exec(function(err,user){
         if(err){ res.status(200).json({'message':err});}
         else {
             if(user.length ==0){
                 res.status(200).json({'message':'No such user exists !'});
             }else{
                 //if user's exist then check the Password field.
                  bcryptjs.compare(req.body.pass1,user[0].pass1,(err,result)=>{
                      if(err) throw err;
                      else{
                          if(result){
                             // res.status(200).json({'message':'success'});
                             let token = jwt.sign({
                                 'email':user[0].email,
                                 'user_id':user[0]._id
                             },"secret",{'expiresIn':'1h'});

                             res.status(200).json({'message':'success','token':token});

                            }else{
                              res.status(200).json({'message':'error'});
                          }
                      }
                  });
             }
         }
     });
    
  });

//make router object available to entire application
module.exports = router;
