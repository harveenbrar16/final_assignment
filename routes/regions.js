/**
 * Created by NABDEEP MANAK on 2016-11-17.
 */
var express = require('express');
var router = express.Router();

var region = require('../models/region');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

router.get('/',isLoggedIn, function(req, res, next) {

    region.find(function(err, regions) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {

            res.render('regions', {
                title: 'All the ODSP That Fit to region',
                regions: regions,
                user:req.user
            });
        }
    });
});
//here we get logged in page

router.get('/add',isLoggedIn, function(req, res, next) {
    res.render('add-regions', {
        title: 'Add a Region',
        user:req.user,
        Name:  "",
        PostalCode:  "",
        PhoneNumber: "",
        Government_Private: "",
        region: "",
        province: ""
    } );
});


router.post('/add', function(req, res, next) {
    // region.save(new region({
    region.create({
            Name:               req.body.Name,
            PostalCode:         req.body.PostalCode,
            PhoneNumber:        req.body.PhoneNumber,
            Government_Private: req.body.Government_Private,
            region:             req.body.region,
            province:           req.body.province
        },
        function(err, regions) {
            if (err) {
                console.log(err);
                res.render('error', { message: 'Could not Add Region'} );
            }
            else {
                res.redirect('/regions');

            }
        });

});


router.get('/delete/:_id/',isLoggedIn, function(req, res, next) {

    var _id = req.params._id;


    region.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Delete region',
                error: err
            });
        }
        else {
            res.redirect('/regions');

        }
    });
});

//it delete the selected information for odsp file
router.get('/add/:_id',isLoggedIn,function(req, res, next) {
    region.findById( { _id: req.params._id }, function(err, region) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Load Region',
                error: err
            });
        }
        else {
            res.render('add-regions', {
                title: 'EDIT a Region',
                user:req.user,
                Name:               region.Name,
                PostalCode:         region.PostalCode,
                PhoneNumber:        region.PhoneNumber,
                Government_Private: region.Government_Private,
                region:             region.region,
                province:           region.province
            });
        }
    });

});

//here it add the information for odsp file

router.post('/add/:_id',isLoggedIn, function(req, res, next) {

    var _id = req.params._id;



    var newRegion = new region({
        _id: _id,
        Name: req.body.Name,
        PostalCode: req.body.PostalCode,
        PhoneNumber:req.body.PhoneNumber,
        Government_Private:req.body.Government_Private,

        region: req.body.region,
        province: req.body.province
    });
//here we get the functionality for adding information for odsp file

    region.update({ _id: _id }, newRegion, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Update Regions',
                error: err
            });
        }
        else {
            res.redirect('/regions');
        }
    });
});
//here we update the information and it takes us to login page with information on it so that we can make changes in that
// make public
module.exports = router;