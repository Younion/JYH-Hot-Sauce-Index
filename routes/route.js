const express = require('express')
const reviewsRouter = express.Router()
const axios = require('axios')
const Airtable = require('airtable');
const { json } = require('express');
const base = new Airtable({ apiKey: 'keyjRGeqc5QA99Q5v' }).base('app4Kq78nyR93DHLC');
const table = base('Hot Sauces');
require("dotenv").config()

// --------------- GET Requests -------------------
reviewsRouter.get('/', async (req, res) => {

  try {
    const url = "https://api.airtable.com/v0/app4Kq78nyR93DHLC/hot%20sauces?filterByFormula=NOT(%7BAverage+Rating%7D+%3D+'')&api_key=";
    const APP_KEY = process.env.API_KEY;
    const airtableAPI = await axios.get(url + APP_KEY)

    // console.log(airtableAPI.data.records)
    res.render('app', { records: airtableAPI.data.records })
  } catch (err) {
    if (err.response) {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    } else if (err.request) {
      console.log(err.request)
    } else {
      console.error('Error', err.message)
    }
  }
})

// ---------------- POST Requests -------------------

// ----------------- Review POST --------------------
reviewsRouter.post('/review', async (req, res) => {
  var Airtable = require('airtable');
  const APP_KEY = process.env.API_KEY;
  var base = new Airtable({ apiKey: APP_KEY }).base('app4Kq78nyR93DHLC');

  base('Tasting Form').create([
    {
      "fields": {
        "Hot Sauce Name": req.body.hotSauceName, //message: 'Value is not an array of record IDs.',
        "Presentation": req.body.presentation,
        "Viscosity": req.body.viscosity,
        "Spiciness Rating": req.body.spiciness,
        "Flavor Notes": req.body.flavorNotes,
        "Overall Rating": req.body.overallRating,
        "Loved It?": req.body.lovedScore,
        "Taster Notes": req.body.addNotes
      }
    }
  ], { typecast: true }, function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(req.body);
      console.log(record.getId());
    });
    console.log('Post successful')
    res.redirect('/');
  });
});

// ---------------- Add POST ------------------
reviewsRouter.post('/add', async (req, res) => {
  const APP_KEY = process.env.API_KEY;
  var base = new Airtable({ apiKey: APP_KEY }).base('app4Kq78nyR93DHLC');


  base('Hot Sauces').create([
    {
      "fields": {
        "Manufacturer": req.body.manufacturerEntry,
        "Sauce Name": req.body.sauceName,
        "Location": req.body.manufacturerLocation,
        "Heat Sources": req.body.heatSources
      }
    }
  ], { typecast: true }, function (err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(req.body);
      console.log(record.getId());
    });
    console.log('Post successful');
    res.redirect('/');
  });
});

// -------------- Exports ---------------
module.exports = reviewsRouter
