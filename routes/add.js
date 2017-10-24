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
var multer  = require('multer');

var storage = multer.diskStorage(({
    destination: function(req, file,cb){
        cb(null, 'public/uploads/');
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
}));

var upload = multer({storage: storage});


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
router.post('/:itemType/', upload.single('photo'),function(req, res, next){
    if(req.user){
        var photo = [];
        if(!req.file){
            console.log("no photo!");
        }else{
            console.log("file there!");
            // image file validator(beta version)
            if(req.file.mimetype.indexOf("image") != -1){
                console.log("photo!");

                // devide localhost and heroku server.
                // when program running in heroku, then use file!
                var localFlg = true;
                if(req.headers.host.indexOf("localhost") != -1){
                    localFlg = true;
                }else{
                    localFlg = false;
                }
                photo.push({path: req.file.path, localFlg: localFlg});
                console.log(photo);
            }
        }

        // TODO: item validation
        req.checkBody('itemName', 'Item name is blank! Fill out please.').notEmpty();

        if(req.params.itemType == "item"){// add buySell item to the database
            req.checkBody("itemPrice", "Price should add valid number").matches(/^([1-9]\d*|0)(\.\d+)?$/);
            function saveData(){
                var BuySellItem = require("../model/buySellItem");
                var item = new BuySellItem();
                item.name = req.body.itemName;
                item.description = req.body.description;
                item.price = req.body.itemPrice;
                item.photo = photo;
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
                item.photo = photo;
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
            res.render("error");// TODO: think proper link move
        }
    }else{
        res.render("error");
    }
});

module.exports = router;
