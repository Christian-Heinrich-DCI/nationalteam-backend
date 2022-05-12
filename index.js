import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;
const app = express();
app.use(cors());

const playerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  club: String,
  position: String,
  yearOfBirth: Number,
});

const Player = mongoose.model("Player", playerSchema, "players");

// Get a list of all players
app.use("/players", async (req, res) => {
  try {
    const players = await Player.find().exec();
    return res.json(players);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log("Projekt Nationalteam läuft auf Port: " + port);
    console.log("Link zum Anklicken: http://localhost:" + port);
  });
});
