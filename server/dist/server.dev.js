"use strict";

var express = require('express');

var router = express.Router();

var bodyParser = require('body-parser');

var cors = require('cors');

var multer = require('multer');

var mongoose = require('mongoose');

var users = require('./dataSchema');

var bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

var posts = require('./postSchema'); //const http = require('http');


var app = express();
var Dbname = "angdb";
var DIR = './upload';
var connectedObj;
var server = app.listen(8000, function () {
  console.log('Server started!');
});

function buildLink(hash) {
  var emailBody = "<h3>Please click on the link below to verify your account</h3>";
  emailBody = emailBody + "<a href='http://localhost:4200/verify-account?hash=" + hash + "'>click here to verify</a>";
  return emailBody;
}

function sendMail(from, to, subject, htmlmsg) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bbad1723@gmail.com",
      pass: "Rockbrock1234"
    }
  });
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: htmlmsg
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      emailFlag = 0;
    } else {
      emailFlag = 1;
      console.log('Email sent:' + info.response);
    }
  });
}

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    try {
      if (req.params.type == "room") {
        DIR = './server/upload/room_pictures';
      }

      cb(null, DIR);
    } catch (_unused) {
      cb(null, DIR);
    }
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname.split('@')[0] + '.' + "jpg");
  }
});
var upload = multer({
  storage: storage
}); // mongoose.connect('mongodb+srv://dbuser:rock123@cluster0.rvaks.mongodb.net/angdb?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology: true});

mongoose.connect('mongodb+srv://dbuser:rock123@cluster0.rvaks.mongodb.net/angdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (!err) {
    connectedObj = mongoose.connection;
    console.log("connected to mongoDB");
  } else {
    console.log("sorry couldn't connect to MongoDB");
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](__dirname + '/upload'));
app.use(cors());
/*app.use(cors({ //set cross origin site for socket
    origin: "http://localhost:4200",
    credentials: true
}));*/

/* 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
*/
//routes----------------------------------------------->

app.post('/login', bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection('users');
  var email = req.body.email;
  var password = req.body.password;
  collection.find({
    email: email,
    password: password
  }).toArray(function (err, data) {
    if (!err && data.length > 0) {
      if (data[0].auth == 1) {
        var fullname = data[0].firstname;
        res.send({
          status: true,
          data: {
            FullName: fullname,
            email: email,
            password: password,
            steamLink: data[0].steamLink
          }
        });
      } else {
        res.send({
          status: false,
          data: {
            err: "please verify your account first with the link in your email"
          }
        });
      }
    } else {
      res.send({
        status: false,
        data: {
          err: "wrong email or password!"
        }
      });
    }
  });
});
app.post('/sign-up', bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection("users");
  var hash = bcrypt.hashSync(req.body.email + req.body.firstname + req.body.password, 10);
  req.body['hash'] = hash;
  req.body['auth'] = 0;
  collection.find({
    email: req.body.email
  }).toArray(function (err, data) {
    if (!err && data.length == 0) {
      collection.insertOne(req.body, function (err, innerdata) {
        if (!err) {
          sendMail("no-reply@Noxtrading.com", req.body.email, "verify your email", buildLink(hash));
          res.send({
            status: true,
            data: {}
          });
        } else {
          res.send({
            status: false,
            data: {
              err: "sorry an error occured wile signing in"
            }
          });
        }
      });
    } else {
      res.send({
        status: false,
        data: {
          err: "An account with this email is already present"
        }
      });
    }
  });
});
app.post('/verify-account', bodyParser.json(), function (req, res) {
  var hash = req.body.hash;
  var collection = connectedObj.collection('users');
  collection.find({
    hash: hash
  }).toArray(function (err, data) {
    if (!err && data.length > 0) {
      collection.updateOne({
        hash: hash
      }, {
        $set: {
          auth: 1
        }
      }, function (innerErr, innerData) {
        if (!innerErr && innerData.modifiedCount > 0 && innerData.matchedCount > 0) {
          console.log("done");
          res.send({
            status: true,
            data: {
              email: data[0].email
            }
          });
        } else {
          console.log(innerErr);
          console.log(innerData);
          res.send({
            status: false,
            data: {
              err: "sorry couldn't update your account"
            }
          });
        }
      });
    } else {
      res.send({
        status: false,
        data: {
          err: "sorry couldn't find your account"
        }
      });
    }
  });
});
app.get('/get-details/:email', function (req, res) {
  var collection = connectedObj.collection("users");
  collection.find({
    email: req.params['email']
  }).toArray(function (err, data) {
    if (!err && data.length > 0) {
      var fullname = data[0].firstname;
      res.send({
        status: "200",
        data: {
          FullName: fullname,
          email: data[0].email,
          password: data[0].password,
          steamLink: data[0].steamLink
        }
      });
    } else {
      res.status(404).send({
        status: "404",
        data: {
          errMsg: "sorry no data found"
        }
      });
    }
  });
});
app.post('/save-details/:email', bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection("users");
  collection.updateOne({
    email: req.params['email']
  }, {
    $set: {
      firstname: req.body.firstName,
      password: req.body.password,
      about: req.body.about,
      gender: req.body.gender
    }
  }, function (err, data) {
    if (!err) {
      res.send({
        success: true
      });
    } else {
      res.send({
        success: false
      });
    }
  });
});
app.post("/upload-profile-picture/:email", upload.single('profilePic'), function (req, res) {
  if (!req.file) {
    console.log("Your request doesn’t have any file");
    return res.send({
      success: false
    });
  } else {
    var collection = connectedObj.collection('users');
    collection.updateOne({
      email: req.params['email']
    }, {
      $set: {
        proPic: req.file.filename
      }
    }, function (err, data) {
      if (err) res.send({
        success: false
      });else {
        console.log('Your file has been received successfully');
        return res.send({
          success: true,
          proPic_src: "http://localhost:8000/" + req.file.filename
        });
      }
    });
  }
});
app.get("/profile-picture/:email", bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection('users');
  collection.find({
    email: req.params['email']
  }).toArray(function (err, data) {
    if (err) {
      res.send({
        success: false
      });
    } else {
      res.send({
        success: true,
        proPic_src: data[0].proPic
      });
    }
  });
});
app.get("/view-profile/:id", bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection('users');
  var email = id_to_email[req.params['id']];
  collection.find({
    email: email
  }).toArray(function (err, data) {
    if (!err && data.length > 0) {
      var fullname = data[0].firstname;
      res.send({
        status: true,
        data: {
          FullName: fullname,
          about: data[0].about || "",
          gender: data[0].gender || '',
          proPic_src: data[0].proPic
        }
      });
    } else {
      res.status(404).send({
        status: false,
        data: {
          errMsg: "sorry no data found"
        }
      });
    }
  });
});
app.post("/query", bodyParser.json(), function (req, res) {
  var collection = connectedObj.collection('queries');
  collection.insertOne(req.body, function (err, data) {
    if (!err) {
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false
      });
    }
  });
});
app["delete"]("/delete/:id", function (req, res) {
  posts.deleteOne({
    _id: req.params.id
  }, function (err, users) {
    if (err) res.status(500).json({
      errMsg: err
    });
    res.status(200).json({
      msg: users
    });
  });
});
app.post('/showdb', function (req, res) {
  console.log(users.find());
});
app.post("/addpost", function (req, res) {
  var newPost = new posts({
    haveItem: req.body.haveItem,
    wantItem: req.body.wantItem,
    gname: req.body.gname,
    username: req.body.username,
    userEmail: req.body.userEmail,
    platform: req.body.platform,
    buyLink: req.body.buyLink,
    postDate: Date.now()
  });
  newPost.save(function (err, posts) {
    if (err) res.status(500).json({
      errMsg: err
    });
    res.status(200).json({
      msg: posts
    });
  });
});
app.get('/read', function (req, res) {
  posts.find({
    userEmail: 'badboydivvg@gmail.com'
  }, function (err, allposts) {
    if (err) res.status(500).json({
      errMsg: err
    });
    res.status(200).json({
      msg: allposts
    });
  });
});
app.post('/readUser', function (req, res) {
  posts.find({
    userEmail: req.body.email
  }, function (err, allposts) {
    if (err) res.status(500).json({
      errMsg: err
    });
    res.status(200).json({
      msg: allposts
    });
  });
});
app.put('/update', function (req, res) {
  posts.findById(req.body._id, function (err, post) {
    post.haveItem = req.body.haveItem;
    post.wantItem = req.body.wantItem;
    post.gname = req.body.gname; //****complete the rest */

    post.save(function (err, post) {});
  });
});
app.post("/postdelete/:id", function (req, res) {
  posts.findOneAndRemove({
    _id: req.params.id
  }, function (err, users) {
    if (err) res.status(500).json({
      errMsg: err
    });
    res.status(200).json({
      msg: users
    });
  });
});