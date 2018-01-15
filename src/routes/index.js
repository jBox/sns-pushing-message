import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send(`<!doctype html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>SNS - Testing</title>
  <link rel="shortcut icon" href="/favicon.ico" />
  <link href="/public/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
  <link href="/public/css/style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
  <section id="root"></section>
  <script type="text/javascript" charset="utf-8" src="/public/js/app.js"></script>
  </body>
  </html>`);
});

module.exports = router;
