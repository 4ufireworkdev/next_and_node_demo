const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  upload: async (req, res) => {
    try {
      const myFile = req.files.myFile;
      if (myFile != undefined) {
        const fileName = myFile.name;

        const fileExtension = fileName.split(".").pop();
        const newFileName = new Date().getTime() + "." + fileExtension;
        const path = "uploads/" + newFileName;
        myFile.mv(path, async (err) => {
          if (err) {
            return res.status(500).send({ error: e.messge });
          }
          return res.send({ message: "success", fileName: newFileName });
        });
      } else {
        return res.status(500).send({ error: "No file uploaded" });
      }
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  create: async (req, res) => {
    try {
      await prisma.food.create({
        data: {
          foodTypeId: req.body.foodTypeId,
          name: req.body.name,
          remark: req.body.remark,
          image: req.body.image,
          price: req.body.price,
          img: req.body.img,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  list: async (req, res) => {
    try {
      const rows = await prisma.food.findMany({
        include: {
            FoodType: true,
          },
        where: {
          status: "use",
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  remove: async (req, res) => {
    try {
      await prisma.food.update({
        data: {
          status: "delete",
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },
};
