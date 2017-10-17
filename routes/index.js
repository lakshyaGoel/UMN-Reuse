var express = require('express');
var router = express.Router();
var User = require("../model/user");

/* GET home page. */
router.get('/', function(req, res, next){

    // TODO: db operation example

    /**
     * Basic insert(Create) operation
     *
     * first, make colletion database object variable
     * then add property correctly
     * finally, use save() function and callback function.
     *
     */

    /*
     var user = new User();

     user.name = "Akifumi";
     user.email = "nakam052@umn.edu";
     user.save(function(err){
     if(err){

     }else{

     }
     });
     */

    /**
     * Basic find(select/ Read) operation
     *
     * use findOne function(could find only 1 item)
     * this example use where() function chain
     * this function filter column by condition.
     */
    User.findOne()
        .where({name: "Akifumi"})
        .where({email: "nakam052@umn.edu"})// equivalent to follwing SQL command. SELECT * from User where name="Akifumi" AND email="nakam052@umn"
        .exec(function(err, column){
            if(err){
                console.log("error occur");
            }
            console.log("run here");

            if(column){
                console.log(column.name);

                // no relation about explanation
                // console.log("console here",res.locals.user);

                // end of no relation about explanation
                res.render('index', {
                    name: column.name,
                    title: "Reuse"
                });
            }else{
                res.render('index', {
                    name: "There is no such item",
                    title: "Reuse"
                });
            }

        });

    /**
     * Basic find(select) operation part2
     *
     * use find() function to get multi columns.
     *
     * this get all data.
     * and if you need to find particular data, use where() same as above.
     */
    /*
    User.find().exec(function(err, columns){
        console.log(columns);

    });
    */

    /**
     * Basic Update operation
     *
     * use find() function to update data
     * mongoose has update function, but it's quite hard to use I think.
     *
     * The way I tell is combinaiton of findOne() function(Create) and save() function(Create)
     */
    /*
    User.findOne({name:"Akifumi"})// same as findOne().where({name:"Akifumi"})
        .exec(function(err, column){
            if(err){

            }else{
                column.email = "max@herper.umn";
                column.save(function(err){
                    if(err){

                    }
                });
            }
        });
    */

    /**
     * Delete method...
     *
     * I think delete method is not necessary, so I didn't write about it now.
     * But if you need that, I ganna tell you.
     */
});

module.exports = router;
