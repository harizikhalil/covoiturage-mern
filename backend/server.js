const express = require("express");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/api/user-route");
const ConducteurRoute = require("./routes/api/conducteur-route");
const passagerRoute = require("./routes/api/passager-route");
const adminRoute = require("./routes/api/admin-route");
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

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
