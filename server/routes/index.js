const exppress = require("express");
const router = exppress.Router();
const treeRouter = require("./treeRouter");
const userRouter = require("./userRouter");
const notificationRouter = require("./notificationRouter");

router.use("/tree", treeRouter);
router.use("/user", userRouter);
router.use("/notification", notificationRouter);

module.exports = router;
