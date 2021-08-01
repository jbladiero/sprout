/*
  Sprout DB
  Delete API
  John Brell G. Ladiero
  C.A.L.S.O
*/
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
router.use(bodyParser.json())



//create
router.get('/', (req, res)=>{
  console.log('index');
  res.json(store.index());
});








module.exports = router
