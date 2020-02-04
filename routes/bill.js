const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const Bill = require("../models/billmod");

router.post("/savebill", (req, res) => {
  // current timestamp in milliseconds
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  // prints date & time in YYYY-MM-DD format
  console.log(date + "-" + month + "-" + month);
  let bill = new Bill({
    customerName: req.body.customerName,
    invoiceNo: Math.floor(100000 + Math.random() * 900000),
    title: req.body.title,
    product: req.body.product,
    totAmount: req.body.totAmt,
    date: date + "-" + month + "-" + year,
    paid: req.body.paid,
    due: req.body.due
  });
  bill.save(err => {
    if (err) {
      res.status(500).json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: bill });
    }
  });
});

router.get("/getallbill", (req, res) => {
  Bill.find({}, (err, bills) => {
    if (err) {
      res.send(err);
    } else {
      res.send(bills);
    }
  });
});

router.post("/getbillbydate", (req, res) => {
  var date = req.body.date;
  Bill.find({ date: date }, (err, bills) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(bills);
    }
  });
});

router.post("/billupdate", (req, res) => {
  var customerName = req.body.customerName;
  Bill.findOneAndUpdate(
    { customerName: customerName },
    {
      customerName: req.body.customerName,
      title: req.body.title,
      product: req.body.product,
      totAmount: req.body.totAmt,
      date: date + "-" + month + "-" + year,
      paid: req.body.paid,
      due: req.body.due
    },
    (err, bill) => {
      if (err) {
        res.statue(500).send(err);
      } else {
        res.status(200).send(bill);
      }
    }
  );
});

module.exports = router;
