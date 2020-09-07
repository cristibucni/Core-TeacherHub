const router = require("express").Router();
let Student = require("../../models/student");
const passport = require("passport");
/** @route
 *  @desc
 *  @access
 */

router.get("/test", (req, res) => res.json({ msg: "students Works" }));

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  Student.deleteMany()
    .then(() => res.json("all deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  Student.insertMany(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOne({ _id: req.params.id })
      .then((Student) => {
        Student.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res
          .status(404)
          .json({ Studentnotfound: "Student has already been deleted" })
      );
  }
);

router.route("/add").post((req, res) => {
  const nume = req.body.nume;
  const newStudent = new Student({ nume });

  newStudent
    .save()
    .then((Student) => res.json(Student))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/", (req, res) => {
  req.body.forEach((bodyPart) =>
    Student.findById(bodyPart._id).then((student) => {
      student.attendances = bodyPart.attendances;
      student.bonuses = bodyPart.bonuses;
      student.save();
    })
  );
  res.json("Done");
});

module.exports = router;
