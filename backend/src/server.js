import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import testRoutes from "./routes/test.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PassItOn Backend Running");
});

app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`PassItOn Server running on port ${PORT}`);
});
