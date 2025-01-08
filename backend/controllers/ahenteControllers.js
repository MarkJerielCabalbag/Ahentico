import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     register ahente
//@ROUTE    POST /api/agentify/ahente/register/:userId
//@ACCESS   private
const registerAhente = asyncHandler(async (req, res, next) => {
  const { name, company, contact, productCoverage } = req.body;
  const { id } = req.params;

  if (!name || !company || !contact || !productCoverage) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }

  //find duplicate
  const ahentes = await prisma.ahente.findMany();

  for (let ahente of ahentes) {
    if (ahente.name === name) {
      return res.status(400).json({
        message: `${ahente.name} is already exist to your distributor list`,
      });
    }
  }

  const newAhente = await prisma.ahente.create({
    data: {
      name: name,
      company: company,
      contact: parseInt(contact),
      productCoverage: productCoverage,
      addedBy: {
        connect: {
          id: parseInt(id),
        },
      },
    },
  });
  res
    .status(200)
    .json({ message: `${newAhente.name} is added as your new distributor` });
});

//@DESC     edit ahente
//@ROUTE    POST /api/agentify/ahente/edit/:ahenteId
//@ACCESS   private
const editAhente = asyncHandler(async (req, res, next) => {
  const { ahenteId } = req.params;
  const { name, company, contact, productCoverage } = req.body;
  if (!ahenteId) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  const ahente = await prisma.ahente.update({
    where: {
      id: parseInt(ahenteId),
    },
    data: {
      name: req.body.name || undefined,
      company: req.body.company || undefined,
      contact: parseInt(req.body.contact) || undefined,
      productCoverage: req.body.productCoverage || undefined,
    },
  });

  return res
    .status(200)
    .json({ message: `${ahente.name} is successfully edited` });
});

//@DESC     remove ahente
//@ROUTE    POST /api/agentify/ahente/del/:ahenteId
//@ACCESS   private
const removeAhente = asyncHandler(async (req, res, next) => {
  const { ahenteId } = req.params;

  if (!ahenteId) {
    return res.status(400).json({ message: "Id is required" });
  }

  const findAhente = await prisma.ahente.findUnique({
    where: {
      id: parseInt(ahenteId),
    },
  });

  if (!findAhente) {
    return res
      .status(400)
      .json({ message: `Ahente with id ${ahenteId} does not exist` });
  }

  const ahente = await prisma.ahente.delete({
    where: {
      id: parseInt(ahenteId),
    },
  });

  return res
    .status(200)
    .json({ message: `You remove ${ahente.name} as your distributor` });
});

//@DESC     view list of ahentes associated with user
//@ROUTE    GET /api/agentify/ahente/list/:userId
//@ACCESS   private
const viewAhentes = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Id is required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    return res.status(400).json({ message: `${userId} does not exist` });
  }

  const ahentes = await prisma.ahente.findMany({
    where: {
      userId: parseInt(userId),
    },
  });

  return res
    .status(200)
    .send(ahentes > 0 ? "There are ahentes listed!" : ahentes);
});

//@DESC     view ahente associated with user
//@ROUTE    GET /api/agentify/ahente/view/:ahenteId
//@ACCESS   private
const viewAhente = asyncHandler(async (req, res, next) => {
  const { ahenteId } = req.params;

  if (!ahenteId) {
    return res.status(400).json({ message: "Id is required" });
  }

  const ahente = await prisma.ahente.findUnique({
    where: {
      id: parseInt(ahenteId),
    },
  });

  if (!ahente) {
    return res.status(400).json({ message: "Id does not exist" });
  }

  return res.status(200).send(ahente);
});
export default {
  registerAhente,
  editAhente,
  removeAhente,
  viewAhentes,
  viewAhente,
};
