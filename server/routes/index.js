const exppress = require("express");
const router = exppress.Router();
const treeRouter = require("./treeRouter");
const userRouter = require("./userRouter");

router.use("/tree", treeRouter);
router.use("/user", userRouter);

module.exports = router;
