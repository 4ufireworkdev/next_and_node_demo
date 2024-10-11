const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      const rowSaleTemp = await prisma.saleTemp.findFirst({
        where: {
          userId: req.body.userId,
          tableNo: req.body.tableNo,
          foodId: req.body.foodId,
        },
      });
      let saleTempId = 0;
      if (!rowSaleTemp) {
        await prisma.saleTemp.create({
          data: {
            userId: req.body.userId,
            tableNo: req.body.tableNo,
            foodId: req.body.foodId,
            qty: 1,
          },
        });
      } else {
        await prisma.saleTemp.update({
          where: {
            id: rowSaleTemp.id,
          },
          data: {
            qty: rowSaleTemp.qty + 1,
          },
        });
      }

      await prisma.saleTempDetails.create({
        data: {
          saleTempId: saleTempId,
          foodId: req.body.foodId,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  list: async (req, res) => {
    try {
      const saleTemps = await prisma.saleTemp.findMany({
        include: {
          SaleTempDetails: {
            include: {
              Food: true,
              Taste: true,
              FoodSize: true,
            },
          },
          Food: true,
        },
      });
      return res.send({ results: saleTemps });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  remove: async (req, res) => {
    try {
      await prisma.SaleTempDetails.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  removeAll: async (req, res) => {
    try {
      const saleTemp = await prisma.saleTemp.findFirst({
        where: {
          userId: parseInt(req.params.userId),
          tableNo: parseInt(req.body.tableNo),
        },
      });

      await prisma.saleTempDetails.deleteMany({
        where: {
          saleTempId: saleTemp.id,
        },
      });

      await prisma.saleTemp.delete({
        where: {
          id: saleTemp.id,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },

  update: async (req, res) => {
    try {
      await prisma.foodSize.update({
        data: {
          name: req.body.name,
          remark: req.body.remark,
          moneyAdded: req.body.moneyAdded,
          foodTypeId: req.body.foodTypeId,
        },
        where: {
          id: req.body.id,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },
};
