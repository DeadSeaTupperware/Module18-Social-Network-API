const { Schema, model, Types } = require("mongoose");

const moment = require("moment");
// Though model schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get friend count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create User model with UserSchema
const Thought = model("Thought", thoughtSchema);
// Export Thought model
module.exports = Thought;
