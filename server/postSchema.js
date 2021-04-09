const mongoose = require('mongoose');

var postSchema = mongoose.Schema(
    {
    haveItem:{type:String},
    wantItem:{type:String},
    gname:{type:String},
    desc:{type:String},
    username:{type:String},
    userEmail:{type:String},
    platform:{type:String},
    buyLink:{type:String},
    postDate:{type:Date},
    userImg:{type:String},
    userJoinDate:{type:Date}


    })

module.exports=mongoose.model('posts',postSchema);
