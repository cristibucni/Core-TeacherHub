const router = require("express").Router();
let Grupa = require("../../models/Grupa");
const passport = require("passport");
/** @route
 *  @desc
 *  @access
 */

router.get("/test", (req, res) => res.json({ msg: "Grupe Works" }));

router.route("/").get((req, res) => {
  Grupa.find()
    .populate({
      path: "students",
    })
    .then((Grupe) => res.json(Grupe))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  Grupa.deleteMany()
    .then(() => res.json("all deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  Grupa.insertMany(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Grupa.findOne({ _id: req.params.id })
      .then((Grupa) => {
        Grupa.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res
          .status(404)
          .json({ Grupanotfound: "Grupa has already been deleted" })
      );
  }
);

router.route("/add").post((req, res) => {
  const nume = req.body.nume;
  const newGrupa = new Grupa({ nume });

  newGrupa
    .save()
    .then((Grupa) => res.json(Grupa))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
