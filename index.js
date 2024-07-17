import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer";
dotenv.config(); // Load environment variables from .env file
// const dbUrl = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const port = process.env.PORT || 3001;
const dbUrl = process.env.DB_URL; //
const app = express();
import path from "path";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Middleware
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.static("uploads")); // Serve uploaded files (images, videos)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
export const upload = multer({ storage: storage });

// MongoDB connection

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;
database.on("connected", () => console.log("MongoDB connected"));
database.on("disconnected", () => console.log("MongoDB disconnected"));
database.on("error", (err) =>
  console.error(`MongoDB connection error: ${err}`)
);

// Basic route for testing server
app.get("/", (req, res) => {
  res.send("Yes, it's working!");
});

// Example route setup (replace with your actual routes)
import authRoutes from "./routes/Auth.js";
import propertyRoutes from "./routes/Property.js";
import NewPropertyRoutes from "./routes/NewProperty.js";
import agentRoutes from "./routes/Agent.js";
import AgentNewRoutes from "./routes/AgentNew.js";
import messageRoutes from "./routes/Message.js";
import paymentRoutes from "./routes/Payment.js";
import {
  getPropertyAddress,
  getPropertyAgent,
  getPropertyTitle,
  getPropertyType,
} from "./controllers/Property.js";
import { MailOfAgent, NameOfAgent } from "./controllers/Agent.js";
import { getAgentDetails } from "./controllers/AgentNew.js";

app.use("/api/auth", authRoutes);
app.use(
  "/api/properties",

  propertyRoutes
);
app.use(
  "/api/agents",

  agentRoutes
);
app.use(
  "/api/agentnew",

  AgentNewRoutes
);
app.use("/api/messages", messageRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/newproperties", NewPropertyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

//mail

// app.post("/api/send-email", async (req, res) => {
//   const { propertyId, agentId, name, email, message, mobileNumber } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "webapprealestate@gmail.com",
//       pass: "mowikxwoopdedyug",
//     },
//   });
//   const propertyAddress = await getPropertyAddress(propertyId);
//   const propertyType = await getPropertyType(propertyId);
//   const propertyTitle = await getPropertyTitle(propertyId);
//   const agentsid = await getPropertyAgent(propertyId);
//   const mail = await getAgentDetails(agentsid);
//   console.log(typeof mail);
//   // Replace with your logic to get the property type
//   const agentName = NameOfAgent(agentId);
//   console.log(mail);
//   const mailOptions = {
//     from: "webapprealestate@gmail.com",
//     to: mail,
//     subject: `Inquiry about Property ${propertyTitle} - ${propertyAddress}`,
//     text: `
//       Dear ${agentName.name},
//       I am writing to express my interest in ${propertyType} located at ${propertyAddress}.
//       I came across this property on your website and would like to inquire about its availability and details.
//       My name is ${name}, and I can be reached at ${email} or ${mobileNumber}.
//       I would appreciate it if you could provide me with the following information:
//       * Current price and any available discounts
//       ${message}
//       * Property features and amenities
//       * Availability and viewing schedule
//       * Any other relevant details that might be helpful in my decision-making process
//       I would also like to request a price suggestion for this property. Could you please provide me with your expert opinion on the current market value of this property?
//       Thank you for your time and assistance.
//       I look forward to hearing back from you soon.
//       Best regards,
//       ${name}
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.response);
//     res.status(200).send("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).send("Error sending email");
//   }
// });
app.post("/api/send-email", async (req, res) => {
  const { propertyId, agentId, name, email, message, mobileNumber } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "webapprealestate@gmail.com",
      pass: "mowikxwoopdedyug",
    },
  });

  try {
    const propertyAddress = await getPropertyAddress(propertyId);
    const propertyType = await getPropertyType(propertyId);
    const propertyTitle = await getPropertyTitle(propertyId);
    const agentsid = await getPropertyAgent(propertyId);
    const mail = await getAgentDetails(agentsid);
    const agentName = await NameOfAgent(agentId);

    const mailOptions = {
      from: "webapprealestate@gmail.com",
      to: mail,
      subject: `Inquiry about Property ${propertyTitle} - ${propertyAddress}`,
      text: `
Dear ${agentName},

I am writing to express my interest in the ${propertyType} located at ${propertyAddress}.

**Property Details:**
- **Title:** ${propertyTitle}
- **Type:** ${propertyType}
- **Address:** ${propertyAddress}

**Inquiry:**
I came across this property on your website and would like to inquire about its availability and details. I would appreciate it if you could provide me with the following information:
1. **Current Price and Discounts:**
   - Any available discounts
2. **Property Features and Amenities:**
   - Detailed features and amenities
3. **Availability and Viewing Schedule:**
   - Available dates and times for viewing
4. **Additional Information:**
   - Any other relevant details that might be helpful in my decision-making process

**Price Suggestion:**
I would also like to request a price suggestion for this property. Could you please provide me with your expert opinion on the current market value of this property?

**Contact Information:**
- **Name:** ${name}
- **Email:** ${email}
- **Phone:** ${mobileNumber}

**Message:**
${message}

Thank you for your time and assistance. I look forward to hearing back from you soon.

Best regards,
${name}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
