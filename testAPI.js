let express = require ("express");
let router = express.Router();

let database = require("../database");
let ColorModel = require("../schema/color");

// {game: doc[0].game,
// squares: doc[0].squares,
// selected: doc[0].selected}

// getting something from the database
router.get("/", function(req, res, next) {
  console.log("doing a get")
  ColorModel
    .find({
    })

    .then(doc => {
      console.log("get complete", doc)
      res.send(doc)
    })

    .catch(err => {
      console.error(err)
    })
})

// putting something into the database
router.put("/", function(req, res, next) {
  console.log("running a put")

  // make my new schema
  let color = new ColorModel ({
    game: req.body.game,
    squares: Array(225).fill(null),
    selected: '#FFFFFF',
  })

  console.log(color)

  //save the information
  color.save()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    })
})

// how to post/edit information
router.post('/', function(req, res, next) {
  console.log("req body" + req.body);
  console.log("doing a post");
  ColorModel
    .findOneAndUpdate (
      {
        game: req.body.game,
      },
      {
        squares: req.body.squares,
        selected: req.body.selected,
      }
    )
    .catch(err => {
      console.error(err);
    })

    ColorModel
      .findOne({game: req.body.game})
      .then(doc => {
        console.log("saved");
        console.log("sending: ", doc)
        res.send(doc);
      })

})

router.delete('/', function(req, res, next) {
  console.log("delete");
  ColorModel
    .remove({
    })
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.error(err);
    })
})

// export it all
module.exports = router;
