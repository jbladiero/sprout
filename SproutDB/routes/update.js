/*
  Sprout DB
  Update API
  John Brell G. Ladiero
  C.A.L.S.O
*/
var express = require('express');
var router = express.Router();


const update = require('../dependencies/update');


var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser({limit: '3mb'}))


//create
router.post('/details', (req, res)=>{
  type = req.body.type;
  course = req.body.course;
  category = req.body.category;
  subject = req.body.subject;

  name = req.body.name;
  description = req.body.description;

  switch (type) {
    case 'course':
      res.json(update.course(course, name, description))
      break;
    case 'category':
      res.json(update.category(course, category, name, description))
      break;
    case 'subject':
      res.json(update.subject(course, category, subject, name, description))
      break;
    default:

  }

});


router.post('/token', (req, res)=>{
  course = req.body.course;
  category = req.body.category;
  subject = req.body.subject;
  token = req.body.token;
  image = req.body.image

  console.log('Token');

  res.json(update.append(course, category, subject, token, image))

})


update.index()







module.exports = router
