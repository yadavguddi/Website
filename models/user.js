
let mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =  require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);