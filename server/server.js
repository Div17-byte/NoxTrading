const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const users = require('./dataSchema');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const posts = require('./postSchema');
const Admin = require('./adminSchema');


const app = express();
const Dbname = "angdb";
const sitePath="http://localhost:8000";

let DIR = './upload';
let connectedObj;

const server = app.listen(8000, () => {
    console.log('Server has been started!')
});




function buildLink(hash){
    var emailBody = "<h1>Hi Trader</h1><br><h3>We Just ned to Verify your email address before you can access Nox Trading</h3>";

    emailBody = emailBody + "<p>Verify your email address </p><a style='background-color:green;border-radius:50px:color:white' href='http://localhost:4200/verify-account?hash=" + hash + "'>Verify</a><br>";
    emailBody += "<h4>Thanks! - Nox Trading</h4>"
    return emailBody;
}


function sendMail(from, to, subject,  htmlmsg)
{
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {

             user: "stevbob545@gmail.com",
              pass:"eJxFr4RvRm"

            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
        emailFlag = 0;
      }
      else
      {  emailFlag = 1;
        console.log('Email sent:'+info.response);
      }
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, "./server/upload")
    },
    filename: (req, file, cb) => {

      cb(null, file.fieldname + '-' + Date.now() + "-"+  file.originalname.split('@')[0] + '.' + "jpg");
    }
});
let upload = multer({storage: storage});

app.post("/file",upload.single("file"),(req, res)=>{
  const file = req.file;

  if(file){
    res.json(file);
  } else{
    throw new Error("File upload Error");
  }
})


// mongoose.connect('mongodb+srv://dbuser:rock123@cluster0.rvaks.mongodb.net/angdb?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology: true});

mongoose.connect('mongodb+srv://dbuser:rock123@cluster0.rvaks.mongodb.net/angdb?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
    if(!err){
        connectedObj = mongoose.connection;
        console.log("connected to mongoDB");
    }
    else{
        console.log("sorry couldn't connect to MongoDB");
    }
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/upload'));
app.use(cors());


///admin router--------------------------------------->
app.post('/admin_register',(req, res)=>{
  const admin = new Admin({
    admin_name:req.body.admin_name,
    admin_email:req.body.admin_email,
    admin_pass:req.body.admin_pass,
    joinDate:Date.now()
  });
  admin.save().then(result=>{
    res.sendStatus(201).json({
      message:'Admin created!',
      result:result,
    })
  })
})

app.post('/admin_login',(req, res)=>{
  Admin.findOne({admin_name:req.body.admin_name,admin_pass:req.body.admin_pass})
  .then(adminRes=>{
    if(!adminRes){
      return res.status(401).json({message:'Auth failed'})
    }else {res.status(200).json({message:'Login authorized',doc:adminRes['admin_email']})
  }
  }).catch(err=>{
    return res.status.apply(401).json({message:'Auth Failed'})
  })
})

app.get('/admin_get_users',(req, res)=>{
  users.find().then(users=>{
    if(users){
      res.status(200).json({res:users})
    }
    else{
      res.status(404).json({message:'Error Getting users'})    }
  })
})

app.get('/admin_get_posts',(req, res)=>{
  posts.find().sort('-postDate').then(posts=>{
    if(posts){
      res.status(200).json({res:posts})
    }
    else{
      res.statusCode(404).json({message:'Error Getting Posts'})
    }
  })
})


app.get('/admin_banUser/:id',(req, res, next)=>{
  var id = {_id:req.params.id};
  users.findByIdAndUpdate(id,{"isBanned":true}).then(doc=>{
    if(!doc)
    {
      return res.status(404).end()
    }
    else
    return res.status(200).send({doc:doc});
  })
})

app.get('/admin_UnbanUser/:id',(req, res, next)=>{
  var id = {_id:req.params.id};
  users.findByIdAndUpdate(id,{"isBanned":false}).then(doc=>{
    if(!doc)
    {
      return res.status(404).end()
    }
    else
    return res.status(200).end();
  })
})

app.delete('/admin_delete_User/:id',(req, res, next)=>{
  var id ={_id:req.params.id};
  users.findByIdAndRemove(id).then(del=>{
    if(!del){ return res.status(404).end()}
    else return res.status(201).send({message:'Not authorized'})
  })
})

app.delete('/admin_delete_Post/:id',(req, res, next)=>{
  var id ={_id:req.params.id};
  posts.findByIdAndRemove(id).then(del=>{
    if(!del){ return res.status(404).end()}
    else return res.status(201).send({message:'Not authorized'})
  })
})






///admin router----------------------------------finised---->
//routes----------------------------------------------->

app.get('/Check_ban_status/:email',(req, res, next)=>{
  users.findOne({email:req.params.email}).then(user=>{
    if(user){
      const isBanned = user['isBanned'];
      return res.status(200).json({isBanned:isBanned})
    }
  })
})
app.post('/login', bodyParser.json(), (req, res)=>{
    var collection = connectedObj.collection('users');

    var email = req.body.email;
    var password = req.body.password;
    collection.find({email:email, password:password}).toArray((err, data)=> {
        if(!err && data.length>0){
            if(data[0].auth==1){
                var  fullname =  data[0].firstname;
                res.send({status:true, data:{FullName: fullname , email:email, password:password,  steamLink:data[0].steamLink}});
            }
            else
            {
                res.send({status:false, data:{err:"please verify your account first with the link in your email"}})
            }

        }
        else{
            res.send({status:false,data:{err:"wrong email or password!"}});
        }
    })
})


app.post('/sign-up', bodyParser.json(), (req, res)=>{

    var collection = connectedObj.collection("users");

    let hash = bcrypt.hashSync(req.body.email+req.body.firstname+req.body.password, 10);
    req.body['hash'] = hash;
    req.body['auth'] = 0;
    collection.find({email:req.body.email}).toArray((err,data)=>{
        if(!err && data.length==0){
            collection.insertOne(req.body,(err, innerdata)=>{
                if(!err){

                    sendMail("no-reply@Noxtrading.com",req.body.email,"verify your email",buildLink(hash))

                    res.send({status:true, data:{}});
                }
                else{
                    res.send({status:false, data:{err:"sorry an error occured wile signing in"}});
                }
            });
        }else{
            res.send({status:false, data:{err:"An account with this email is already present"}});
        }
    });

});

app.post('/verify-account', bodyParser.json(), (req, res)=>{
    var hash= req.body.hash;
    var collection = connectedObj.collection('users');
    collection.find({hash:hash}).toArray((err, data)=>{
        if(!err && data.length> 0){
              collection.updateOne({hash:hash}, {$set:{auth:1}}, (innerErr, innerData)=>{
                    if(!innerErr && innerData.modifiedCount>0 && innerData.matchedCount >0){
                        console.log("done");
                        res.send({status:true, data:{email:data[0].email}});

                    }else{
                        console.log(innerErr);
                        console.log(innerData);
                        res.send({status:false, data:{err:"sorry couldn't update your account"}});
                    }
              });
            }else{
                res.send({status:false, data:{err:"sorry couldn't find your account"}});
            }
     })
})

app.get('/get-details/:email', (req, res)=>{
    var collection = connectedObj.collection("users");
    collection.find({email:req.params['email']}).toArray((err,data)=>{
       if(!err && data.length>0){
           var fullname = data[0].firstname ;
           res.send({status:"200" , data:{FullName:fullname , email:data[0].email, password: data[0].password, steamLink:data[0].steamLink}});
       }
       else{
           res.status(404).send({status:"404", data:{errMsg: "sorry no data found"}});
       }
    });
})

app.post('/save-details/:email', bodyParser.json(), (req, res)=>{
    var collection = connectedObj.collection("users");
    collection.updateOne({email:req.params['email']}, {$set:{firstname:req.body.firstName,password:req.body.password,about:req.body.about, gender:req.body.gender}}, (err, data)=>{
        if(!err){
            res.send({success:true});
        }else{
            res.send({success:false});
        }
    })
})


app.post("/upload-profile-picture/:email", upload.single("profilePic"), (req, res)=>{
    if (!req.file) {
        console.log("Your request doesn’t have any file");
        return res.send({
          success: false
        });

      } else {
        var collection = connectedObj.collection('users');
        const serverPath=sitePath+'/';
        collection.updateOne({email:req.params['email']}, {$set:{proPic: req.file.filename,userImgPath:sitePath+"/"+req.file.filename}},(err, data)=>{

            if(err)
               {console.log(err);
              res.send({success:false},{errMsg:err},{file:req.file.filename});}
            else{
                console.log('Your file has been received successfully');
                return res.send({
                  success: true,
                  proPic_src : sitePath+"/"+req.file.filename
                })
            }

        })

      }
});



app.get("/profile-picture/:email", bodyParser.json(), (req, res)=>{
     var collection = connectedObj.collection('users');
     collection.find({email:req.params['email']}).toArray((err, data)=>{
         if(err){
             res.send({success: false});
         }else{
             res.send({success:true, proPic_src: data[0].proPic});
         }
     })
});

app.get("/view-profile/:id", bodyParser.json(), (req,res)=>{
    var collection = connectedObj.collection('users');
    var email = id_to_email[req.params['id']];
    collection.find({email:email}).toArray((err,data)=>{
        if(!err && data.length>0){
            var fullname = data[0].firstname;
            res.send({status:true , data:{FullName:fullname ,about:data[0].about||"", gender:data[0].gender||'', proPic_src:  data[0].proPic}});
        }
        else{
            res.status(404).send({status:false, data:{errMsg: "sorry no data found"}});
        }
     });
});

app.post("/query", bodyParser.json(), (req,res)=>{
    var collection = connectedObj.collection('queries');
    collection.insertOne(req.body,(err,data)=>{
        if(!err){
            res.send({status:true});
        }else{
            res.send({status:false});
        }
    })
});

app.delete("/delete/:id",(req, res)=>{
    posts.deleteOne({_id:req.params.id},(err,users)=>{
        if(err)
        res.status(500).json({errMsg:err});

        res.status(200).json({msg:users})
    })
    })

app.post('/showdb',(req,res)=>{
    console.log(users.find())


})



app.post("/addpost",(req,res)=>{

    var newPost = new posts({
        haveItem:req.body.haveItem,
        wantItem:req.body.wantItem,
        gname:req.body.gname,
        desc:req.body.desc,
        username:req.body.username,
        userEmail:req.body.userEmail,
        platform:req.body.platform,
        buyLink:req.body.buyLink,
        postDate:Date.now(),
        userImg:req.body.userImg,
        userJoinDate:req.body.userJoinDate,


    });

    newPost.save((err,posts)=>{
        if(err)
        res.status(500).json({errMsg:err})
        res.status(200).json({msg:posts})
    });

});

app.get("/getOneUser/:email",(req, res)=>{
  users.findOne({"email":req.params.email},(err,onePost)=>{
    if(err)
    res.status(500).json({errMsg:err});
    else
    res.status(200).json({gotUser:onePost});
  })

})

app.get('/read',(req,res)=>{
    posts.find((err,allposts)=>{
        if(err)
        res.status(500).json({ errMsg: err })
        res.status(200).json({msg:allposts})
    }).sort('-postDate');

})

app.post('/readUser',(req,res)=>{
    posts.find({userEmail:req.body.email},(err,allposts)=>{
        if(err)
        res.status(500).json({ errMsg: err })
        res.status(200).json({msg:allposts})
    }).sort('-postDate');

})

app.put('/update',(req,res)=>{
    posts.findById(req.body._id,(err,post)=>{

        post.haveItem=req.body.haveItem;
        post.wantItem=req.body.wantItem;
        post.gname=req.body.gname;
        //****complete the rest */
        post.save((err,post)=>{

        })
    })
})
app.post("/postdelete/:id",(req, res)=>{
    posts.findOneAndRemove({_id:req.params.id},(err,users)=>{
        if(err)
        res.status(500).json({errMsg:err});

        res.status(200).json({msg:users})
    })
    })
