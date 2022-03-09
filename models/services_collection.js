const database = require('../database/connect_db');

const ServiceSchema = new database.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  service_name:{
    type:String,
    required:true,
  },
 
  details:{
    type:String,
  },
  is_active: {
    type: Boolean,
     default: 1
    },
});

const Service = database.model('Service', ServiceSchema);
module.exports = Service;