import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;
