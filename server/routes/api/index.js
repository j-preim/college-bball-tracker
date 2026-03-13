const router = require("express").Router()
const entryRoutes = require("./entry.routes");
const userRoutes = require("./user.routes");

router.use("/entry", entryRoutes);
router.use("/user", userRoutes);

module.exports = router;