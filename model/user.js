var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// should use constant defined in .env
mongoose.connect(process.env.DB_URI);

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    email: {
        type:String,
        unique:true,
        required:true,
        validator:function(v){
        return /.+@.+\..+/.test(v)
        }
    },
    phoneNumber: String
});

module.exports = mongoose.model("User", userSchema);

