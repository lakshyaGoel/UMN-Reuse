var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// should use constant defined in .env
mongoose.connect(process.env.DB_URI);

var buySellItem = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    name: {
        type:String,
        validator:function(v){// string length more than 1(Not blank restriction)
            return /.+/.test(v)
        }
    },
    photo: [],
    description: String,
    price: Number,
    userId: Schema.Types.ObjectId
});

module.exports = mongoose.model("BuySellItem", buySellItem);

