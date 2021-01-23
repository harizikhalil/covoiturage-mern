const express = require("express");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/api/user-route");
const ConducteurRoute = require("./routes/api/conducteur-route");
const passagerRoute = require("./routes/api/passager-route");
const adminRoute = require("./routes/api/admin-route");
const path = require("path");
const app = express();

//Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());

//routes
app.use("/api/user", userRoute);
app.use("/api/conducteur", ConducteurRoute);
app.use("/api/passager", passagerRoute);
app.use("/api/admin", adminRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
