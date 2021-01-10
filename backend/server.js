const express = require("express");
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/api/user-route");
const app = express();

//Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
