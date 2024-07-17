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
    experience: {
      type: Number,
      required: true,
    },
    certifications: {
      type: [String],
    },
    areasOfExpertise: {
      type: [String],
    },
    languagesSpoken: {
      type: [String],
    },
    biography: {
      type: String,
    },
    socialMediaLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },
    clientTestimonials: [
      {
        clientName: String,
        testimonial: String,
        date: Date,
      },
    ],
    officeLocation: {
      type: String,
    },
    availability: {
      type: String,
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
    agentRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const AgentNew = mongoose.model("AgentNew", AgentSchema);
export default AgentNew;
