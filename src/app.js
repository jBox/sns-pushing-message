import express from "express";
import Path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import index from "./routes/index";
import sns from "./routes/sns";

const app = express();

// uncomment after placing your favicon in /public
app.use(favicon(Path.join(__dirname, "../public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json({ type: "application/*+json" }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/*" }));
app.use(cookieParser());
app.use("/public", express.static(Path.join(__dirname, "../public")));

app.use("/", index);
app.use("/sns", sns);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ status: err.status || 500, message: err.message });
});

module.exports = app;
