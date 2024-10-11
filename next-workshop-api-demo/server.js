const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));

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
const foodSizeController = require("./controllers/FoodSizeController");
const tasteController = require("./controllers/TasteController");
const foodController = require("./controllers/FoodController");
const saleTempController = require("./controllers/SaleTempController");


app.post("/api/user/signIn", (req, res) => userController.signIn(req, res));
app.post("/api/foodType/create", (req, res) =>
  foodTypecontrolller.create(req, res)
);
app.get("/api/foodType/list", (req, res) => foodTypecontrolller.list(req, res));
app.delete("/api/foodType/remove/:id", (req, res) =>
  foodTypecontrolller.remove(req, res)
);
app.put("/api/foodType/update", (req, res) =>
  foodTypecontrolller.update(req, res)
);
app.post("/api/foodSize/create", (req, res) =>
  foodSizeController.create(req, res)
);
app.get("/api/foodSize/list", (req, res) => foodSizeController.list(req, res));
app.delete("/api/foodSize/remove/:id", (req, res) =>
  foodSizeController.remove(req, res)
);
app.put("/api/foodSize/update", (req, res) =>
  foodSizeController.update(req, res)
);

app.post("/api/taste/create", (req, res) => tasteController.create(req, res));
app.get("/api/taste/list", (req, res) => tasteController.list(req, res));
app.delete("/api/taste/remove/:id", (req, res) =>
  tasteController.remove(req, res)
);
app.put("/api/taste/update", (req, res) => tasteController.update(req, res));

app.post("/api/food/upload", (req, res) => foodController.upload(req, res));
app.post("/api/food/create", (req, res) => foodController.create(req, res));
app.get("/api/food/list", (req, res) => foodController.list(req, res));
app.delete("/api/food/remove/:id", (req, res) =>
  foodController.remove(req, res)
);
app.put("/api/food/update", (req, res) => foodController.update(req, res));
app.get("/api/food/filter/:foodType", (req, res) =>
  foodController.filter(req, res)
);

app.post("/api/saleTemp/create", (req, res) => saleTempController.create(req, res));
app.get("/api/saleTemp/list", (req, res) => saleTempController.list(req, res));
app.delete("/api/saleTemp/remove/:id", (req, res) =>
  saleTempController.remove(req, res)
);
app.delete("/api/saleTemp/removeAll/:id", (req, res) =>
  saleTempController.removeAll(req, res)
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
