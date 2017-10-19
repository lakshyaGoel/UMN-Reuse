var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    var Item = require("../model/buySellItem");
    // the code for add test buy sell test data
    // for(var i = 0; i < 20; i++){
    //     var item = new Item();
    //     item.name = "Pen " + i;
    //     item.description = "This is a Pen " + i;
    //     item.price = i;
    //     item.userId = req.user._id;
    //     item.save();
    // }
    Item.find().exec(function(err, column){
        var isLoggedIn;
        var userID;
        var itemData = [];
        if(req.user){
            isLoggedIn = true;
            userID = req.user.displayName;
        }else{
            isLoggedIn = false;
            userID = "NA";
        }
        column.forEach(function(x){
            var a = JSON.parse(JSON.stringify(x));
            a["loggedIn"] = isLoggedIn;
            a["userEmailID"] = userID;
            itemData.push(a);
        });
        res.render('index.hbs', {
            items: itemData
        });
    });
});
module.exports = router;