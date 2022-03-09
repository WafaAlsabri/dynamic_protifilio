const { Router } = require('express');
const assert = require("assert")
const multer = require('multer');
const path = require('path');
const User = require('../models/user_collection');
const Skills = require('../models/skill_collection');
const Exper = require('../models/experince_collectio');
const Service = require('../models/services_collection');
const Contact = require('../models/contact_collection');



// ===multer file==//

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload');
  },
  filename: (req, file, cb) => {
    const randomNumber = Math.round(Math.random() * 1e9);
    const uniqueSuffix = `${Date.now()}-${randomNumber}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  fileFilter: (req, { fieldname, mimetype, originalname }, cb) => {
    const isProfile = fieldname == 'user_image' && mimetype == 'image/jpeg';
    const isCV = fieldname == 'cv_file' && mimetype == 'application/pdf';

    if (isProfile) cb(null, true);
    else if (isCV) cb(null, true);
    else cb(new Error(`Sorry  The type of ${originalname} not support.`), false);
  },
  storage,
});

// ==routing==//
const router = Router();





router.get('/login', (req, res) => {
  res.render('login', { title: 'login Page'})
})
router.get('/', async(req, res)=> {
  
  var skill_i= await Skills.find();
  var experience_i= await Exper.find();
 
  res.render('index',{skills:skill_i,exper:experience_i});
 });

router.get('/index', async(req, res)=> {
  
  var skill_i= await Skills.find();
  var experience_i= await Exper.find();
 
  res.render('index',{skills:skill_i,exper:experience_i});
 });

// Skills page
router.get('/my-skill', function(req, res, next) {
  Skills.find().then((result)=>{
    console.log(result);
    res.render('my-skill', { skills:result});
  })
  });

router.get('/sidebar', function(req, res, next) {
  Exper.find().then((result)=>{
    res.render('sidebar', { exper:result});
    
  })
  });

// exper page
router.get('/my-experince', function(req, res, next) {
  Exper.find().then((result)=>{
    res.render('my-experince', { exper:result});
    
    console.log(result);
    
  })
  });

  // services page
  router.get('/my-service', function(req, res, next) {
    Service.find().then((result)=>{
      res.render('my-service', { Service:result});
    console.log(result);
    })
    });
// user operation
const userFilesHandler = upload.fields([
]);
//find
router.get('/dashboard', (req, res, next)=>{
  User.find().then((result) =>{
    res.render('dashboard', { data: result})
  })
})
//Add new skill to the view in the data tables section
router.post('/addskills', function(req, res, next) {
     
  var skillDetails = new Skills({
    categotry:req.body.categotry,
    skill_name: req.body.skill_name,
    progress_percent: req.body.progress_percent,
  });
   
  skillDetails.save();
        
console.log("skill was add")
res.redirect('/my-skill');

});

// Edit Skills
router.post('/Edit_skills', function(req, res, next){
  
  var item = {
    categotry:req.body.categotry,
    skill_name: req.body.skill_name,
   
    progress_percent: req.body.progress_percent,
  };
  var id = req.body.id;
  Skills.updateMany({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/my-skill');
});
router.post('/Edit_skills', function(req, res, next){
  
  var item = {
    categotry:req.body.categotry,
    skill_name: req.body.skill_name,
   
    progress_percent: req.body.progress_percent,
  };
  var id = req.body.id;
  Skills.updateone({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/my-skill');
});

router.get('/hide_skill/:id', async function(req, res, next){
  console.log("hhhhhhhhhhhhhhhhhhh");
  // var id = req.params.id.replace(/ /g,"");
  const skill = await Skills.findById(req.params.id);

  // console.log("adfadf");
  // await Skills.updateone({"_id": id}, {    is_active: !skill.is_active  }, item, function(err, result){
   
  //   console.log("item hidden");
  //   console.log(item);
  // })

  Skills.updateOne({"_id":req.params.id},{is_active: !skill.is_active},function(err,result){
    console.log("item hidden");
  })
  res.redirect('/my-skill');
});




//Delete skill item

router.get('/delete_skill/:id',function(req,res,next){
  Skills.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
  res.redirect('/my-skill');

});

////////// add exper
router.post('/addexper', function(req, res, next) {
     
  var experDetails = new Exper({
    experince_name: req.body.experince_name,
    source:req.body.source,
    details:req.body.details,
    year: req.body.year,
  });
  experDetails.save();
console.log("experince was add")
res.redirect('/my-experince');

});

// Edit exper
router.post('/Edit_exper', function(req, res, next){
  var item = {
    experince_name: req.body.experince_name,
    source:req.body.source,
    details:req.body.details,
    year: req.body.year,
  };
  var id = req.body.id;
  Exper.updateMany({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/my-experince');
});

//Delete exper item

router.get('/delete_exper/:id',function(req,res,next){
  Skills.deleteOne({"_id":req.params.id},function(err,result){
    console.log("item deleted");
  })
  res.redirect('/my-experince');

});


////////// add service
router.post('/addservice', function(req, res, next) {
  try{
   var serviceDetails = new Service({
    
     service_name: req.body.service_name,
     details:req.body.details,
   });
   
   serviceDetails.save();
 console.log("Service was add")
 res.redirect('/my-service');
  }catch{

  }
});

// Edit sevice
router.post('/Edit_service', function(req, res, next){
var item = {
 
 service_name: req.body.service_name,
 details:req.body.details,
};
var id = req.body.id;
Service.updateMany({"_id": id}, {$set: item}, item, function(err, result){

 console.log("item updated");
 console.log(item);
})
res.redirect('/my-service');
});



////////// add contact
router.post('/addcontact', function(req, res, next) {
     
  var contactDetails = new Contact({
   icon: req.body.icon,
   contact_name:req.body.contact_name,
   link:req.body.link,
  });
  contactDetails.save();
console.log("Contact was add")
res.redirect('/dash-contact');

});

// Edit Contact
router.post('/Edit_contact', function(req, res, next){
  var item = {
    icon: req.body.icon,
    contact_name:req.body.contact_name,
    link:req.body.link,
  };
  var id = req.body.id;
  Contact.updateMany({"_id": id}, {$set: item}, item, function(err, result){
   
    console.log("item updated");
    console.log(item);
  })
  res.redirect('/dash-contact');
});
 router.get('*', function(req, res, next) {
   res.render('page-404', {
    title: ' Error not found ',
  }); });
module.exports = router;

