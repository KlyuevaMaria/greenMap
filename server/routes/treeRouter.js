const express = require("express");
const treeController = require("../controllers/TreeController");
const router = express.Router();

router.post('/', treeController.createTree)
router.post('/new-status', treeController.createStatus)
router.post('/new-note', treeController.createSpecialNote)
router.post('/new-env', treeController.createEnv)
router.post('/new-condition', treeController.createCondition)


module.exports = router
