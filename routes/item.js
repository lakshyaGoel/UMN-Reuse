var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    var Item = require("../model/buySellItem");
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