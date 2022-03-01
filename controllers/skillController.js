const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Skill = mongoose.model('Skill');

router.get('/', (req, res) => {
    res.render("skill/addOrEdit", {
        viewTitle: "Insert "
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var skill = new Skill();
    skill.fullName = req.body.fullName;
    skill.level = req.body.level;
   skill.source = req.body.source;
   skill.descreption = req.body.descreption;
  skill.save((err, doc) => {
        if (!err)
            res.redirect('skill/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("skill/addOrEdit", {
                    viewTitle: "Insert skill",
                    skill: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
   Skill.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('skill/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("skill/addOrEdit", {
                    viewTitle: 'Update skill',
                    skill: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
   Skill.find((err, docs) => {
        if (!err) {
            res.render("skill/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Skill.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("skill/addOrEdit", {
                viewTitle: "Update skill",
                skill: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Skill.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/skill/list');
        }
        else { console.log('Error in skill delete :' + err); }
    });
});

module.exports = router;