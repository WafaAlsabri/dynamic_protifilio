const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Experince = mongoose.model('Experince');

router.get('/', (req, res) => {
    res.render("experince/addOrEdit", {
        viewTitle: "Insert experince"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var experince = new Experince();
    experince.fullName = req.body.fullName;
    experince.email = req.body.email;
    experince.mobile = req.body.mobile;
    experince.city = req.body.city;
    experince.save((err, doc) => {
        if (!err)
            res.redirect('experince/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("experince/addOrEdit", {
                    viewTitle: "Insert experince",
                    experince: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Experince.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('experince/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("experince/addOrEdit", {
                    viewTitle: 'Update experince',
                    experince: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Experince.find((err, docs) => {
        if (!err) {
            res.render("experince/list", {
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
    Experince.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("experince/addOrEdit", {
                viewTitle: "Update experince",
                experince: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Experince.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/experince/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});

module.exports = router;