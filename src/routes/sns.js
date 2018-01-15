import express from "express";
import { subscribe, confirmSubscription } from "../sns/subscribe";
import { getSubscriptions } from "../sns/subscriptions";

const router = express.Router();

/* POST sns listing. */
router.post("/", function (req, res) {
  const snsMessageType = req.header("x-amz-sns-message-type");
  if (!snsMessageType) {
    return res.send({ status: 500, message: "Not allow." });
  }

  const jsonBody = JSON.parse(req.body);
  switch (snsMessageType) {
    case "SubscriptionConfirmation":
      return confirmSubscription(jsonBody).then((subscriptionArn) => {
        res.send({ subscriptionArn });
      }).catch(error => {
        res.status(500);
        res.send(error);
      });
  }
});

/* POST sns listing. */
router.post("/subscribe/:topic", (req, res) => {
  const { topic } = req.params;
  subscribe(topic).then((data) => {
    res.send(data);
  }).catch(error => {
    res.status(500);
    res.send(error);
  });
});

/* list subscriptions */
router.get("/subscriptions", (req, res) => {
  getSubscriptions().then((data) => {
    res.send(data);
  }).catch(error => {
    res.status(500);
    res.send(error);
  });
});

/* list messages */
router.get("/messages", (req, res) => {

});


module.exports = router;
