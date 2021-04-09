var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    firstname:{type: String},
    lastname:{type : String},
    proPic:{type: String},
    userImgPath:{type:String},
    joinDate:{type:Date},
    isBanned:{type:Boolean}
})


module.exports=mongoose.model('users',userSchema);
