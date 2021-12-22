const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()

const user = require('../models/User.js')
const ObjectId = require('mongoose').Types.ObjectId

// api needs to be created for Get, Post, Put, Delete
// Base path for FoodItem requests consider http://localhost:3000/FoodItems
// '/' in post refers to base path



//get api for user data using name and pwd
router.get('/', (request, response) =>{
    // let userobj = new User({
    //     name : request.body.name,
    //     password: request.body.password,
    //     role : 'admin'
    // })
    user.find((err, doc) => {
        if(err){
            console.log("Error in get data " + err)
        }else{
            response.send(doc)
        }
    })
        // user.find({name: request.body.name},{password : request.body.password}, (err, doc) => {
        //     if(err){
        //                 console.log("Error in get data " + err)
        //             }else{
        //                 response.send(doc)
        //             }
        // })
    
    
})

// get api for one user data fetch
router.get('/:name', (request, response) =>{
    let userobj = {
        name : request.body.name,
        password: request.body.password,
        role : 'admin'
    }
    console.log(request);
        user.find({name:request.params.name, password:userobj.password}, (err, doc) => {
            if(err){
                        console.log("Error in get data " + err)
                    }else{
                        response.send(doc)
                    }
        })
   
    
})


// Post api as unless data is posted nothing can be retrieved
// the data received from angular application will be available in request 
// the FoodItem object will be received in the request
router.post('/',(request, response) => {

    let userobj = {
        name : request.body.name,
        password: request.body.password,
        role : 'admin'
    }
    

         user.countDocuments({name:userobj.name, password:userobj.password}, (err, count ) => {
             if (!err && count > 0){
            console.log("matched");
            response.send(true)  ;
  }
    else{
        console.log("not matched");

        response.send(false);
    }})

        // user.find({name:userobj.name, password:userobj.password}, (err, doc) => {
        //     if(err){
        //                 console.log("Error in get data " + err)
        //             }else{
        //                 if ()
        //                 response.send(doc)
        //             }
        // })
   
   
   
})
router.put('/',(request, response) => {

    let userobj = {
        name : request.body.name,
        password: request.body.password,
        newpassword: request.body.newpassword1,

        role : 'admin'
    }
    

         user.countDocuments({name:userobj.name, password:userobj.password}, (err, count ) => {
             if (!err && count > 0){
                user.updateOne({name:userobj.name, password:userobj.password},
                     {$set : {password:userobj.newpassword}}, (err, count ) => {

                    console.log("password changed");
                    response.send(true)  ;
                    })

                }
            else{
                console.log("not matched");

                response.send(false);
            }
        })

        // user.find({name:userobj.name, password:userobj.password}, (err, doc) => {
        //     if(err){
        //                 console.log("Error in get data " + err)
        //             }else{
        //                 if ()
        //                 response.send(doc)
        //             }
        // })
   
   
   
})
// delete api 
router.delete('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){
        user.findByIdAndRemove(request.params.id, (err, doc) => {
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

        let userobj = {
         name : request.body.name,
        password: request.body.password,
        role : request.body.role
		}
        user.findByIdAndUpdate(request.params.id, {$set : userobj}, {new : true},(err, doc) => {
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