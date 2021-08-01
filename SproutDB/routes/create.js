/*
  Sprout DB
  Create API
  John Brell G. Ladiero
  C.A.L.S.O
*/
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
router.use(bodyParser.json())

const create = require('../dependencies/create');


//create
router.get('/', (req, res)=>{
  console.log('Create');
});

router.post('/course', (req, res)=>{
  console.log('New Course');
  // return token id for image (if any)
  code = req.body.code;
  name = req.body.name;
  description = req.body.description;
  res.json(create.course(code, name, description));
})

router.post('/category', (req, res)=>{
  console.log('New Category');
  // return token id for image (if any)
  course = req.body.course;
  code = req.body.code;
  name = req.body.name;
  description = req.body.description;
  res.json(create.category(course,code, name, description));
})


router.post('/subject', (req, res)=>{
  console.log('New Subject');
  // return token id for image (if any)
  course = req.body.course;
  category = req.body.category;

  code = req.body.code;
  name = req.body.name;
  description = req.body.description;
  res.json(create.subject(course, category, code, name, description));
})


router.post('/token', (req, res)=>{
  console.log('Token Update');
  // return token id for image (if any)
})

router.post('/image', (req, res)=>{
  console.log('Token Image Update');
})






module.exports = router
