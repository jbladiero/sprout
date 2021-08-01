/*
  Sprout DB
  Read API
  John Brell G. Ladiero
  C.A.L.S.O
*/
var express = require('express');
var router = express.Router();

const read = require('../dependencies/read');

var bodyParser = require('body-parser')
router.use(bodyParser.json())




//read
router.get('/', (req, res)=>{
  console.log('Reading Index File');
  res.json(read.index())
});


router.get('/course/:c', (req, res)=>{
  console.log(`Reading Course: ${req.params.c}`);
  res.json(read.course(req.params.c))
});

router.get('/category/:course-:category', (req, res)=>{
  console.log(`Reading category: ${req.params.course}-${req.params.category}`);
  res.json(read.category(req.params.course,req.params.category))
});


router.get('/subject/:course-:category-:subject', (req, res)=>{
  console.log(`Reading subject: ${req.params.course}-${req.params.category}-${req.params.subject}`);
  res.json(read.subject(req.params.course,req.params.category, req.params.subject))
});




module.exports = router
