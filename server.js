const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectionDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectionDb();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});
