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

router.get('/:itemType/:itemId', function(req, res, next){
    console.log("run here", req.params.itemType, req.prams.itemId);
    if(req.user){
        if(req.params.itemType == "item"){// add buySell item to the database
            var itemPromise = new Promise();

        }else if(req.params.itemType == "roadside"){

        }

        console.log("logined");
    }
    // TODO: if update, send the current data.

    // TODO: Must use Promise()! It is better than callback chain.(when update I need you, Promise() )
});

/* POST home page. */
router.post('/', function(req, res, next){
    // TODO: step0(outside of this route file): first modify app.js to use this route.
    // TODO: step1: confirm user login
    // TODO: step2: confirm data. like, data type={buySell or roadSide}, create or update?
    // TODO: step3: validate data(might be validate in client side, but double check is important)
    // TODO: step4: add data
    // TODO: step5: send success or false signal
    // TODO: step6(client side): show success/false message

    // TODO: Must use Promise()! It is better than callback chain.
});

module.exports = router;
