const express = require('express');
var bird_controller = require('../controllers/bird_controller');
var birds = require('../models/birds.js')
const multer = require('multer')
var mime = require('mime-types')
var mongoose = require('mongoose');


/* create a router (to export) */
const router = express.Router();
//const upload = multer({ dest: __dirname + '/../public/images/' })
const storage = multer.diskStorage({
    destination:  __dirname + '/../public/images/',
    filename: function (req, file, cb) {
    cb(null, Math.random().toString(36).slice(2) + "." + mime.extension(file.mimetype))  
    }
})

const upload = multer({ storage: storage })




/* route the default URL: `/birds/ */
router.get('/', async (req, res) => {
    // extract the query params
    if (req.query.id !== undefined) {
        const bird = req.query.id;
        const b = await bird_controller.individual_bird(bird)
        res.render('single', {
            bird: b
        });
    }
    else {
        const search = req.query.search;
        const status = req.query.status;
        const sort = req.query.sort;
        const b = await bird_controller.filter_bird_data(search, status, sort);
        // render the Pug template 'home.pug' with the filtered data
        res.render('home', {
            birds: b
        });
    }
})



// TODO: finishe the "Create" route(s)
router.get('/create', (req, res) => {
    // currently does nothing except redirect to home page
    res.render('create')
});

router.post('/api/upload', upload.single('myFile'), async function (req, res) {
    var bird_document;
    var file = req.file;
    var data = req.body
    var other_arr = data.othname.split(", ");
    console.log(file)
    
    if(file != undefined){
        bird_document = {
            _id: mongoose.Types.ObjectId(),
            primary_name: data.pname,
            english_name: data.ename,
            scientific_name: data.sname,
            order: data.ordname,
            family: data.fname,
            other_names: other_arr,
            status: data.status,
            photo: {
                credit: data.credit,
                source: file.filename
            },
            size: {
                length: {
                    value: data.length,
                    units: 'cm'
                },
                weight: {
                    value: data.weight,
                    units: 'g'
                }
            }
        }
    }else{
        bird_document = {
            _id: mongoose.Types.ObjectId(),
            primary_name: data.pname,
            english_name: data.ename,
            scientific_name: data.sname,
            order: data.ordname,
            family: data.fname,
            other_names: other_arr,
            status: data.status,
            photo: {
                credit: data.credit,
                source: "default.jpg"
            },
            size: {
                length: {
                    value: data.length,
                    units: 'cm'
                },
                weight: {
                    value: data.weight,
                    units: 'g'
                }
            }
        }
    }
    const db_info = await birds.create(bird_document);
    console.log(bird_document)
    console.log(db_info, '/api/create-message response');
    res.redirect("/")

});




// TODO: Update bird route(s)


// TODO: Delete bird route(s)
router.post('/api/delete-bird', async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const db_info = await birds.findByIdAndDelete({ _id: id });
    console.log(db_info, '/api/delete repsonse')
    res.status(200).send("success! deleted message");
});




module.exports = router; // export the router