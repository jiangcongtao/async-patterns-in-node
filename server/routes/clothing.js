const express = require('express');
const fs = require('fs');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/').get(function (req, res) {
  // we use the reafile (async) method so it doesnt block
  // the rest of the code (event loop), for example...
  // console.log(Doing more work) goes first, and then the
  // fs.readFile
  getClothingData((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Returning data');
      res.send(data);
    }
  });
  console.log('Doing more work');
});

// with this callback we notify the caller that the function
// its done doing his work. (that the data is already readed)

function getClothingData(callback) {
  fs.readFile(datafile, 'utf8', (err, data) => {
    if (err) {
      // we call the original callback funcion and pass the error
      //  it needs, and null since there's no data to pass
      callback(err, null);
    } else {
      let clothingData = JSON.parse(data);
      // same as before, call the original callback funcion and
      // since there's no error, we pass null as first parameter
      // and the data as a second parameter
      callback(null, clothingData);
    }
  });
}

module.exports = router;
