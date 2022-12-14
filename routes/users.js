var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

// Create JSON client

var client = restify.createJsonClient({
  url:'http://localhost:4000'
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  client.get('/users', (err, request, response, obj) => {
  
    assert.ifError(err)

    res.json(obj)

  })

})


router.get('/:id', function(req, res, next) {
  
  client.get(`/users/${req.params.id}`, (err, request, response, obj) => {
  
    assert.ifError(err)

    res.json(obj)

  })

})

//Method put

router.put('/:id', function(req, res, next) {
  
  client.put(`/users/${req.params.id}`, req.body, (err, request, response, obj) => {

    assert.ifError(err)

    res.json(obj)

  })

})


//Method delete


router.delete('/:id', function(req, res, next) {
  
  client.del(`/users/${req.params.id}`, (err, request, response, obj) => {
  
    assert.ifError(err)

    res.json(obj)

  })

})

//Method para post


router.post('/', function(req, res, next) {
  
  client.post(`/users`, req.body, (err, request, response, obj) => {
  
    assert.ifError(err)

    res.json(obj)

  })

});





module.exports = router;
