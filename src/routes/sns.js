import express from "express";
import { subscribe, unsubscribe, confirmSubscription } from "../sns/subscribe";
import { getSubscriptions } from "../sns/subscriptions";
import { set, get } from "../sns/notification";

const router = express.Router();

const status = {
  sns: "on"
};

/* POST sns listing. */
router.post("/", function (req, res) {
  const snsMessageType = req.header("x-amz-sns-message-type");
  if (!snsMessageType) {
    res.status(500);
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
    case "Notification":
      if (status.sns === "on") {
        set(jsonBody);
        res.send();
      } else {
        try {
          res.status(500);
          res.send();
          console.log("Trying...", jsonBody);
        } catch (e) {
          console.log(e);
        }
      }
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
/* POST sns listing. */
router.post("/unsubscribe/:arn", (req, res) => {
  const { arn } = req.params;
  unsubscribe(arn).then((data) => {
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
  const items = get();
  res.send({
    totalCount: items.length,
    data: items.slice(-500).reverse()
  });
});

router.get("/status", (req, res) => {
  res.send(status);
});

router.post("/status/:sns", (req, res) => {
  const { sns } = req.params;
  status.sns = "off";
  if (sns === "on") {
    status.sns = "on";
  }

  res.send(status);
});

module.exports = router;
