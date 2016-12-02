/**
 * Created by NABDEEP MANAK on 2016-12-01.
 */
var mongoose = require('mongoose');
//here we are getting mongoose

var regionSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'Please enter a name'
    },
//getting name from user
    PostalCode:{
        type:String,
        required:'Please enter the postal code '
    },
    //getting the postal code from the user
    PhoneNumber:{
        type:Number,
        required:'Please enter the number'
    },
    //getting the phone number from user
    Government_Private:{
        type:String,
        required:'Please enter whether it is own by government or private'
    },
    //asking the user whether the origanization is runned by government or private
    region: {
        type: String,
        required: 'Please choose a region'
    },
    //asking the user for region
    province: {
        type: String,
        required: 'Please enter the province'
    }
    //asking the user for province

});

// make the class public for the user
module.exports = mongoose.model('region', regionSchema);