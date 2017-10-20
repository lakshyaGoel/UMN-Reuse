var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

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
            if(a.interested.indexOf(req.user.displayName) != -1){
                a["savedFlg"] = true;
            }else{
                a["savedFlg"] = false;
            }
            var flag = false;
            if(userID == a["userId"]){
                flag = true;
            }
            a["isUser"] = flag;
            itemData.push(a);
        });
        res.render('index.hbs', {
            items: itemData
        });
    });
});

router.post('/item-save',function(req, res){
    var obj = {};
    console.log('body: ' + JSON.stringify(req.body.id));
    var BuySellItem = require("../model/buySellItem");
    BuySellItem.findOne({"_id": ObjectId(req.body.id), "interested":{$nin: [req.user.displayName]}}).exec(function(err, column){
        if(err){
        }
        console.log(column);
        var result = JSON.stringify({"save-result": false});
        if(column){
           column.interested.push(req.user.displayName);
            column.save(function(err){
                if(err){
                }else{
                    result = JSON.stringify({"save-result": true});
                }
                res.send(result);
            });
        }else{
            res.send(result);
        }
    });
});


module.exports = router;