const mongoose = require('mongoose');

// the data model that we need to specify as below
// name of the model and schema of model (schema will be an object)
const FoodItem = mongoose.model('FoodItem', {
    name : {type: 'string'},
    price: {type: 'number'},
    category : {type: 'string'}
});

module.exports = FoodItem;