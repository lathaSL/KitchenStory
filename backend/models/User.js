const mongoose = require('mongoose');

// the data model that we need to specify as below
// name of the model and schema of model (schema will be an object)
const User = mongoose.model('User', {
    name : {type: 'string'},
    password: {type: 'string'},
    role : {type: 'string'}
});

module.exports = User;