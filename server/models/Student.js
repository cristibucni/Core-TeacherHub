const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Create Schema */
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  attendances: [
    {
      date: { type: Date },
      teacher: { type: String },
    },
  ],
  bonuses: [
    {
      date: { type: Date },
      teacher: { type: String },
    },
  ],
});

module.exports = Student = mongoose.model("students", StudentSchema);
