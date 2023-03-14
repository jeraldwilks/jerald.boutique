import mongoose from "mongoose";

mongoose.connect(
  "mongodb://mongo:PAwK4VesnWEHA567CiVc@containers-us-west-187.railway.app:5709"
);
export const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});
