const database = require('../database/connect_db');


const experSchema = new database.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  experince_name:{
    type:String,
    required:true,
  },
 
  source:{
    type:String,
    required:true,
  },
  details:{
    type:String,
  },
  year:{
    type:Number,
    required:true,
  },
  is_active: {
    type: Boolean,
     default: 1
    },
});

const Exper = database.model('Experience', experSchema);
module.exports = Exper;