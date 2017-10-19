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
    // TODO: how to send data in textarea tag...
    if(req.user){
        if(req.params.itemType == "item"){// add buySell item to the database
            console.log(req);
            // var itemPromise = new Promise();
            // validate data,

        }else if(req.params.itemType == "roadside"){

        }

        console.log("logined");
    }
    // TODO: step3: validate data(might be validate in client side, but double check is important)
    // TODO: step4: add data
    // TODO: step5: send success or false signal
    // TODO: step6(client side): show success/false message

    // TODO: Must use Promise()! It is better than callback chain.
});

module.exports = router;
