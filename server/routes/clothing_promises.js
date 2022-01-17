const express = require('express');
const fs = require('fs');
const { send } = require('process');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/').get(function (req, res) {
  getClothingData()
    .then((data) => {
      console.log('Returnint clothing data to browser');
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
    .finally(() => {
      console.log('All done procesing the promise');
    }); // for both cases

  console.log('Doing more work');
});

function getClothingData() {
  return new Promise((resolve, reject) => {
    fs.readFile(datafile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let clothingData = JSON.parse(data);
        resolve(clothingData);
      }
    });
  });
}

module.exports = router;
