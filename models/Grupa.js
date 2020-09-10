const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  nume: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
  ],
});

module.exports = Event = mongoose.model("grupe", GroupSchema);
