require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8009;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(userRoutes);
app.use(resumeRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
