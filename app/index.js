const express = require("express");
const app = express();
const port = 5000;
const connectDb = require("./db.js");
const router = require("./routes/routing.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);
connectDb();

app.listen(port, () => {
  console.log(`server connected on ${port}`);
});
