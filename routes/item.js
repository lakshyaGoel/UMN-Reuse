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
        // TODO: fix it to enable saved => save. now only use could do save => saved
        /**
         * what I mean is
         * now user can put interested label, but user cannot remove interested label.
         * I think user need this functionality.
         *
         * To do that, first, remove "interested":{$nin: [req.user.displayName]} of line44 of this code
         * and confirm labeled or not inside exec() function.
         * Also, need a fix to local.js $.ajax part.
         */
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