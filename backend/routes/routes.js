const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()

const FoodItem = require('../models/FoodItem.js')
const ObjectId = require('mongoose').Types.ObjectId

// api needs to be created for Get, Post, Put, Delete
// Base path for FoodItem requests consider http://localhost:3000/FoodItems
// '/' in post refers to base path


// get api for all FoodItem data fetch
router.get('/', (request, response) =>{
    FoodItem.find((err, doc) => {
        if(err){
            console.log("Error in get data " + err)
        }else{
            response.send(doc)
        }
    })
})

// get api for one FoodItem data fetch
router.get('/:name', (request, response) =>{
    var regex = new RegExp(["^.*?", request.params.name, ".*?$"].join(""), "i");

    console.log(regex)

    // if(ObjectId.isValid(request.params.name)){
        FoodItem.find({name:regex}, (err, doc) => {
            if(err){
                        console.log("Error in get data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    // } else {
    //     return response.status(404).send("No record found")
    // }
    
})


// Post api as unless data is posted nothing can be retrieved
// the data received from angular application will be available in request 
// the FoodItem object will be received in the request
router.post('/',(request, response) => {
    let foodobj = new FoodItem({
        name : request.body.name,
        price: request.body.price,
        category : request.body.category
    })


    foodobj.save((err, doc) =>{
        if(err){
            console.log("Error in post data " + err)
        }else{
            console.log("added");
            response.send(doc)

        }
    })
})

// delete api 
router.delete('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){
        FoodItem.findByIdAndRemove(request.params.id, (err, doc) => {
            if(err){
                        console.log("Error in delete FoodItem data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})

// put api 
router.put('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){

        let foodobj = {
         name : request.body.name,
        price: request.body.price,
        category : request.body.category
		}
        FoodItem.findByIdAndUpdate(request.params.id, {$set : foodobj}, {new : true},(err, doc) => {
            if(err){
                        console.log("Error in update FoodItem data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})

module.exports = router;