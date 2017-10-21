var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', function(req, res, next){
  var Item = require("../model/buySellItem");
  var RSItem = require("../model/roadsideItem");
  var pitem;
  var userID;
  var itemDataRS = [];
  if(req.user){
    userID = req.user.displayName;
  }else{
    userID = "NA";
  }
  Item.find().where({"userId": userID})
    .exec(function(err, column){
      if(err){
        console.log(err);
      }
      if(column){
        pitem = JSON.parse(JSON.stringify(column));
      }
    });
    RSItem.find().exec(function(err, column){
      var isLoggedIn;
      var userID;
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

      var flag = false;
      if(userID == a["userId"]){
        flag = true;
      }
      a["isUser"] = flag;
      itemDataRS.push(a);
    });
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
        if(a.interested.indexOf(userID) != -1){
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
        items: itemData,
        personalitems: pitem,
        itemsRS: itemDataRS
      });
    })
  }).catch(function(err){
    console.log("run erro?");
  });
});

router.post('/item-save',function(req, res){
    var obj = {};
    var BuySellItem = require("../model/buySellItem");
    BuySellItem.findOne({"_id": ObjectId(req.body.id)}).exec(function(err, column){
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
        var result = {"save-result": false};
        if(column){
            if(column.interested.indexOf(req.user.displayName) != -1){// already saved
                column.interested.splice( column.interested.indexOf(req.user.displayName), 1 ) ;
                result.act = "unsave";
            }else{// not saved yet
                column.interested.push(req.user.displayName);
                result.act = "save";
            }
            column.save(function(err){
                if(err){
                }else{
                    result = result["save-result"] = true;
                }
                res.send(JSON.stringify(result));
            });
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

router.post('/item-delete',function(req, res){
    var BuySellItem = require("../model/buySellItem");
    BuySellItem.deleteOne({"_id": ObjectId(req.body.id)})
        .then(function(){
            res.send(JSON.stringify({"result": true}));
        })
        .catch(function(){
            res.send(JSON.stringify({"result":false}));
        });

});
router.post('/item-interested',function(req, res){
    var BuySellItem = require("../model/buySellItem");
    var userID;
    if(req.user){
        userID = req.user.displayName;
    }else{
        userID = "NA";
    }
    BuySellItem.find({"_id": ObjectId(req.body.id)})
         .then(function(column){
          //  var result = column["interested"];
          //  console.log("DATA::: " + result);
          var result = '<p>' + column + '</p>';
          res.render('partials/myitem.hbs', {data : result});
         })

});
module.exports = router;
