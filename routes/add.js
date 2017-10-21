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
        //req.checkBody('itemPrice', 'Item price is illegal! Fill out number please!');

        if(req.params.itemType == "item"){// add buySell item to the database
            function saveData(){
                var BuySellItem = require("../model/buySellItem");
                var item = new BuySellItem();
                item.name = req.body.itemName;
                item.description = req.body.description;
                item.price = req.body.itemPrice;
                item.userId = req.user.displayName;
                return item.save(function(err){
                    if(err){
                        return false;
                    }else{
                        return true;
                    }
                });
            }
        }else if(req.params.itemType == "roadside"){
            console.log("route/add roadside");

            function saveData(){
                var RoadSideItem = require("../model/roadsideItem");
                var item = new RoadSideItem();
                item.name = req.body.itemName;
                item.description = req.body.description;
                item.userId = req.user.displayName;
                console.log(req.body);
                var addLocation = {
                    "type": "Point",
                    "coordinates": [req.body.lat, req.body.lon]
                };

                item.location["type"] = "Point";
                item.location=(addLocation);
                console.log("start req.body");
                console.log(req.body);
                return item.save(function(err){
                    if(err){
                        return false;
                    }else{
                        return true;
                    }
                });
            }
        }

        var errors = req.validationErrors();
        console.log("error",errors);
        if(!errors){
            console.log("save start");
            var promise = Promise.resolve();
            saveData()
                .then(function(result){
                    console.log("save result: " + result);
                    if(result){
                        console.log("success!");
                        res.redirect('/');
                    }else{
                        console.log("false");
                        res.render("error");
                    }
                });
        }else{
            res.render("error");
        }
    }else{
        res.render("error");
    }
});

module.exports = router;
