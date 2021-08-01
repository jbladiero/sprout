const express = require('express');
const router = express.Router();



const bodyParser = require('body-parser')
router.use(bodyParser.json())


const create = require('../routes/create');
const read = require('../routes/read');
const update = require('../routes/update');
const del = require('../routes/delete');



router.get('/', (req, res)=>{
  console.log('index');
  res.json(store.index());
});

router.get('/compile', (req, res)=>{
  res.send(store.compile());
});


router.use('/create', create);
router.use('/read', read);
router.use('/update', update);
router.use('/delete', del);





module.exports = router
