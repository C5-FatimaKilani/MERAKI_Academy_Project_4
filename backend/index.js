const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products")
const wishListRouter = require("./routes/wishList")

// Routes Middleware
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/wishList", wishListRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
