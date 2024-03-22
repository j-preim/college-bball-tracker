const router = require("express").Router()
const noteRoutes = require("./note.routes");
const userRoutes = require("./user.routes");

router.use("/note", noteRoutes);
router.use("/user", userRoutes);

module.exports = router;