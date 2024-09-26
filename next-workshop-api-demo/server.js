const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ######## LOG REQUEST Zone ########
function logRequest(req, res, next) {
  console.log("method : '" + req.method + "' , path : '" + req.url + "'");
  next();
}
app.use(logRequest);
// ######## LOG REQUEST Zone ########

// ######## Router Zone ########
const userController = require("./controllers/UserController");
const foodTypecontrolller = require("./controllers/FoodTypeController");
app.post("/api/user/signIn", (req, res) => userController.signIn(req, res));
app.post("/api/foodType/create", (req, res) =>
  foodTypecontrolller.create(req, res)
);
app.get("/api/foodType/list", (req, res) => foodTypecontrolller.list(req, res));
app.delete("/api/foodType/remove/:id", (req, res) =>
  foodTypecontrolller.remove(req, res)
);
// ######## Router Zone ########

// ######## PORT Zone ########
const port = 3001;
app.listen(port, () => {
  console.log(" —————————————————————————————————————————————————");
  console.log("|                                                 |");
  console.log("|         API Server Running on Port " + port + "         |");
  console.log("|                                                 |");
  console.log(" —————————————————————————————————————————————————");
});
// ######## PORT Zone ########
