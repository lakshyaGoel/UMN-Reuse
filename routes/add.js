/**
 * This route is to add any kind of item
 * basically, url is like that
 *
 * localhost:3000/add/[item type]/[item id]
 * or
 * localhost:3000/add/[item type]/
 */
var express = require('express');
var router = express.Router();

router.get('/:itemType/', function(req, res, next){
    var title = "Add ";
    var isRoadside = false;
    if(req.params.itemType == "item"){// add new buy sell item
        title += "selling Item";

    }else if(req.params.itemType == "roadside"){// add new roadside item
        title += "roadside Item";
        isRoadside = true;
    }else{// illegal url
        res.render("error");
    }

    res.render('addItem.hbs', {
        title: title,
        itemType: req.params.itemType,
        isRoadside: isRoadside,
        scripts:["addItemFormControl.js"]
    });
});


/* POST home page. */
router.post('/:itemType/', function(req, res, next){
    if(req.user){
        req.checkBody('itemName', 'Item name is blank! Fill out please.').notEmpty();
        req.checkBody('itemPrice', 'Item price is illegal! Fill out number please!').matches(/\${0,1}\d+\.\d+/);

        // TODO: step1: get user ID from User database
        // TODO: step2: save itemdata to BuySell database
        // TODO: step3: if success, send success.

        if(req.params.itemType == "item"){// add buySell item to the database
            // TODO: step2: save itemdata
            function saveData(userId, formData){

            }
        }else if(req.params.itemType == "roadside"){
            //TODO: step2: save itemdata
            function saveData(userId, formData){

            }
        }

        var promise = Promise.resolve();
        // TODO: step1: get user ID from User database
        function getCurrentUserId(){
            var user = require("../model/user");
            user.findOne().where({name: "user"}).exec(function(err, column){
                if(err){

                }

                if(column){

                }else{

                }
            });
        }
        var errors = req.validationErrors();
        console.log(errors);
        if(!errors){
            // promise
            //     .then(getCurrentUserId())
            //     .then(saveData())
            //     .then()
            //     .catch();
        }else{

        }
    }
    // TODO: step6(client side): show success/false message
    // TODO: Must use Promise()! It is better than callback chain.
});

module.exports = router;
