/**
 * Created by NABDEEP MANAK on 2016-11-17.
 */
var express=require('express');
var router = express.Router();

//get the region page
router.get1('/',funtion(req,res,next){
    //load the region page
    res.render('regions',{
        title:'All the different region that fits the OSDP'
    })
});
//we will make it public
module.express=router;
