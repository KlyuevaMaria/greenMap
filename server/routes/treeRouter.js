const express = require("express");
const treeController = require("../controllers/TreeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = express.Router();

router.post("/", treeController.createTree);
router.post("/new-status", checkRoleMiddleware('ADMIN'), treeController.createStatus);
router.post("/new-note", checkRoleMiddleware('ADMIN'), treeController.createSpecialNote);
router.post("/new-env", checkRoleMiddleware('ADMIN'), treeController.createEnv);
router.post("/new-condition", checkRoleMiddleware('ADMIN'), treeController.createCondition);
router.get("/get-statuses", treeController.getStatus);
router.get("/get-envs", treeController.getEnvs);
router.get("/get-conditions", treeController.getConditions);

module.exports = router;
