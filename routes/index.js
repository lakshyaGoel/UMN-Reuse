var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){

});



/*myitems*/
router.post("/interested",function(req, res){
  console.log("user id"+req.body.userid);
  res.render('partials/myitem', {u_id: 'req.body.userid'});

});


module.exports = router;
